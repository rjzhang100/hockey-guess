import { FC } from "react";
import { GameDay } from "../../types/nhlTypes";
import { hashGameData } from "../../utils/utils";
import GameCard from "../GameCard/GameCard";
import { Grid2 } from "@mui/material";

interface IGameGridProps {
  gameData: GameDay;
}

const GameGrid: FC<IGameGridProps> = ({ gameData: data }) => {
  return (
    <Grid2 container spacing={2} justifyContent="center">
      {data.games.map((game) => (
        <Grid2
          key={hashGameData({
            home: game.teams.home,
            away: game.teams.away,
            date: data.date.raw,
          })}
          width="100%"
          height="100%"
          size={{
            sm: 12,
            md: 5,
          }}
        >
          <GameCard
            gameId={hashGameData({
              home: game.teams.home,
              away: game.teams.away,
              date: data.date.raw,
            })}
            gameInfo={game}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
export default GameGrid;
