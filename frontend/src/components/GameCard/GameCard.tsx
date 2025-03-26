import { FC, useState } from "react";
import { Game } from "../../types/nhlTypes";
import { Container, Dialog, Grid2, Typography } from "@mui/material";
import {
  getTeamPrimaryColour,
  getTeamSecondaryColour,
} from "../../constants/nhlColours";
import { AnimatePresence, motion } from "motion/react";
import GameCardDialog from "../GameCardDialog/GameCardDialog";
import GameCardTeamInfo from "../GameCardTeamInfo/GameCardTeamInfo";

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
              />
            </Grid2>
          </Grid2>
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
              <GameCardDialog gameId={gameId} gameInfo={gameInfo} />
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameCard;
