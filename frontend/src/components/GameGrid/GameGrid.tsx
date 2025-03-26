import { FC } from "react";
import { Game, GameDay } from "../../types/nhlTypes";
import { hashGameData } from "../../utils/utils";
import GameCard from "../GameCard/GameCard";
import { Grid2 } from "@mui/material";

interface IGameGridProps {
  gameData: GameDay;
}

const GameGrid: FC<IGameGridProps> = ({ gameData: data }) => {
  console.log(data);
  return (
    <Grid2 container spacing={3}>
      {data.games.map((game) => (
        <Grid2
          key={hashGameData({
            home: game.teams.home,
            away: game.teams.away,
            date: data.date.raw,
          })}
          size={{
            xs: 12,
            sm: 6,
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
