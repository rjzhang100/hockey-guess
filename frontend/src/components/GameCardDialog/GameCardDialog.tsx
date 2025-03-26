import { Button, Container, Grid2, Stack, Typography } from "@mui/material";
import GameCardTeamInfo from "../GameCardTeamInfo/GameCardTeamInfo";
import { Game } from "../../types/nhlTypes";
import { FC } from "react";

interface IGameCardDialogProps {
  gameId: string;
  gameInfo: Game;
}

const GameCardDialog: FC<IGameCardDialogProps> = ({ gameId, gameInfo }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Pick Your Winner!</Typography>
      <Grid2
        container
        gap={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Grid2 size={5}>
          <Stack>
            <GameCardTeamInfo
              teamAbbrv={gameInfo.teams.home.abbreviation}
              locationName={gameInfo.teams.home.locationName}
              teamName={gameInfo.teams.home.teamName}
              side="Home"
              theme="light"
            />
            <Button variant="contained">
              Vote for {gameInfo.teams.home.locationName}
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={5}>
          <Stack>
            <GameCardTeamInfo
              teamAbbrv={gameInfo.teams.away.abbreviation}
              locationName={gameInfo.teams.away.locationName}
              teamName={gameInfo.teams.away.teamName}
              side="Away"
              theme="light"
            />
            <Button variant="contained">
              Vote for {gameInfo.teams.away.locationName}
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default GameCardDialog;
