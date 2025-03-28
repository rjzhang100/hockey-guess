import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import GameCardTeamInfo from "../GameCardTeamInfo/GameCardTeamInfo";
import { Game } from "../../types/nhlTypes";
import { FC, useContext, useState } from "react";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { errorMap } from "../../constants/errorMap";
import { AuthContext } from "../../contexts/AuthContext";
import VoteTable from "../VoteTable/VoteTable";
import { teamAbbrvToTeamName } from "../../constants/consts";
import { getWinner } from "../../utils/utils";

interface IGameCardDialogProps {
  gameId: string;
  gameInfo: Game;
  closeDialog: () => void;
  votingClosed: boolean;
}

const GameCardDialog: FC<IGameCardDialogProps> = ({
  gameId,
  gameInfo,
  closeDialog,
  votingClosed,
}) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const { user } = useContext(AuthContext);
  const voteMutation = trpc.vote.castVote.useMutation({
    onError(error) {
      const { data } = error;
      toast(errorMap[data?.code || "DEFAULT"], {
        type: "error",
      });
    },
    onSuccess() {
      toast(`Successfully voted for ${selectedTeam}`, {
        type: "success",
      });
      closeDialog();
    },
  });

  const handleSubmitVote = () => {
    voteMutation.mutate({
      userId: user.id,
      userName: user.name,
      gameId: gameId,
      votedFor: selectedTeam,
    });
  };

  return (
    <>
      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        {!votingClosed && (
          <Typography variant="h5">Pick Your Winner!</Typography>
        )}
        <Grid2
          container
          gap={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Grid2 size={12}>
            <Typography
              marginBottom="1rem"
              variant="h5"
              display="flex"
              justifyContent="center"
            >
              {gameInfo.status.state == "FINAL"
                ? `WINNER: ${teamAbbrvToTeamName[getWinner(gameInfo)]}`
                : ""}
            </Typography>
          </Grid2>
          <Grid2 size={5}>
            <Stack gap={"1rem"}>
              <GameCardTeamInfo
                teamAbbrv={gameInfo.teams.home.abbreviation}
                locationName={gameInfo.teams.home.locationName}
                teamName={gameInfo.teams.home.teamName}
                side="Home"
                theme="light"
                gameStarted={gameInfo.status.state != "PREVIEW"}
                score={gameInfo.scores[gameInfo.teams.home.abbreviation]}
              />
              {!votingClosed && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedTeam(gameInfo.teams.home.locationName);
                    setShowConfirm(true);
                  }}
                >
                  Vote for {gameInfo.teams.home.locationName}
                </Button>
              )}
            </Stack>
          </Grid2>
          <Grid2 size={5}>
            <Stack gap={"1rem"}>
              <GameCardTeamInfo
                teamAbbrv={gameInfo.teams.away.abbreviation}
                locationName={gameInfo.teams.away.locationName}
                teamName={gameInfo.teams.away.teamName}
                score={gameInfo.scores[gameInfo.teams.away.abbreviation]}
                side="Away"
                theme="light"
                gameStarted={gameInfo.status.state != "PREVIEW"}
              />
              {!votingClosed && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedTeam(gameInfo.teams.away.locationName);
                    setShowConfirm(true);
                  }}
                >
                  Vote for {gameInfo.teams.away.locationName}
                </Button>
              )}
            </Stack>
          </Grid2>
        </Grid2>
        <VoteTable gameId={gameId} gameStatus={gameInfo.status} />
      </Stack>
      {showConfirm && (
        <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
          <DialogContent>
            <Stack alignItems="center" gap="1rem">
              <Typography variant="body1">
                Are you sure you want to vote for {selectedTeam}? You can't undo
                this.
              </Typography>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    setShowConfirm(false);
                    handleSubmitVote();
                  }}
                >
                  Yes
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setShowConfirm(false)}
                >
                  No
                </Button>
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GameCardDialog;
