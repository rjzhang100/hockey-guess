import { FC, useEffect, useRef, useState } from "react";
import { Game } from "../../types/nhlTypes";
import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  Grid2,
  Typography,
} from "@mui/material";
import {
  getTeamPrimaryColour,
  getTeamSecondaryColour,
} from "../../constants/nhlColours";
import { AnimatePresence, motion } from "motion/react";
import GameCardDialog from "../GameCardDialog/GameCardDialog";
import GameCardTeamInfo from "../GameCardTeamInfo/GameCardTeamInfo";
import { trpc } from "../../utils/trpc";
import StatusPill from "../StatusPill/StatusPill";
import { getWinner } from "../../utils/utils";
import {
  teamAbbrvToLocation,
  teamAbbrvToTeamName,
} from "../../constants/consts";
import { COLOURS } from "../../constants/styles";

interface IGameCardProps {
  gameId: string;
  gameInfo: Game;
}

const GameCard: FC<IGameCardProps> = ({ gameInfo, gameId }) => {
  const homePrimaryColour = getTeamPrimaryColour(gameInfo.teams.home.teamName);
  const homeSecondaryColour = getTeamSecondaryColour(
    gameInfo.teams.home.teamName
  );
  const awayPrimaryColour = getTeamPrimaryColour(gameInfo.teams.away.teamName);
  const awaySecondaryColour = getTeamSecondaryColour(
    gameInfo.teams.away.teamName
  );
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = trpc.vote.getVoteByGameByUser.useQuery({
    gameId: gameId,
  });
  const tallyMutation = trpc.vote.tallyVotesForGame.useMutation();

  console.log(gameInfo);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (gameInfo.status.state === "FINAL") {
      tallyMutation.mutate({
        gameId: gameId,
        gameWinner: teamAbbrvToLocation[getWinner(gameInfo)],
      });
    }
  }, []);

  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          alignSelf: "center",
        }}
      />
    );
  }
  const vote = data as any | undefined;
  const voteCorrect = !!vote
    ? vote.votedFor == teamAbbrvToLocation[getWinner(gameInfo)]
    : undefined;

  console.log(vote);

  const getStatusText = () => {
    switch (gameInfo.status.state) {
      case "FINAL":
        return `Winner: ${teamAbbrvToTeamName[getWinner(gameInfo)]}`;
      case "LIVE":
        return `P${gameInfo.status.progress?.currentPeriod}: ${gameInfo.status.progress?.currentPeriodTimeRemaining.pretty} left`;
      case "PREVIEW":
        return !!vote ? `Voted for ${vote.votedFor}` : `Vote now!`;
      case "POSTPONED":
        return "";
    }
  };

  return (
    <>
      <motion.div
        layoutId={gameId}
        whileHover={{
          scale: 1.05,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Container
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid grey",
            borderRadius: "4px",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <Grid2
            container
            width="100%"
            sx={{
              paddingY: "12px",
              background: `linear-gradient(to right, ${homePrimaryColour} 0%, ${homePrimaryColour} 15%, ${homeSecondaryColour} 30%, #ffffff 45%, #ffffff 55%, ${awayPrimaryColour} 70%, ${awaySecondaryColour} 85% )`,
            }}
          >
            <Grid2 size={5}>
              <GameCardTeamInfo
                side="Home"
                teamAbbrv={gameInfo.teams.home.abbreviation}
                locationName={gameInfo.teams.home.locationName}
                teamName={gameInfo.teams.home.teamName}
                score={gameInfo.scores[gameInfo.teams.home.abbreviation]}
                gameStarted={gameInfo.status.state != "PREVIEW"}
              />
            </Grid2>
            <Grid2
              size={2}
              sx={{
                marginY: "auto",
              }}
            >
              <Typography align="center" variant="h5">
                VS
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <GameCardTeamInfo
                side="Away"
                teamAbbrv={gameInfo.teams.away.abbreviation}
                locationName={gameInfo.teams.away.locationName}
                teamName={gameInfo.teams.away.teamName}
                score={gameInfo.scores[gameInfo.teams.away.abbreviation]}
                gameStarted={gameInfo.status.state != "PREVIEW"}
              />
            </Grid2>
          </Grid2>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
            paddingY="1rem"
            bgcolor={
              !vote || gameInfo.status.state != "FINAL"
                ? COLOURS.WHITE
                : voteCorrect
                ? COLOURS.SUCCESS_GREEN
                : COLOURS.ERROR_RED
            }
          >
            <StatusPill gameStatus={gameInfo.status} />
            <Box>
              <Typography variant="body1">{getStatusText()}</Typography>
            </Box>
          </Box>
        </Container>
      </motion.div>
      <AnimatePresence>
        {open && (
          <Dialog open={open} onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} // Start with low opacity and scale
              animate={{ opacity: 1, scale: 1 }} // Fade in and scale to normal size
              exit={{ opacity: 0, scale: 0.95 }} // Fade out and scale down
              transition={{ duration: 0.05 }} // Smooth transition for opacity and scale
              style={{ padding: 16 }}
            >
              <GameCardDialog
                gameId={gameId}
                gameInfo={gameInfo}
                closeDialog={() => setOpen(false)}
                votingClosed={!!vote || gameInfo.status.state != "PREVIEW"}
              />
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameCard;
