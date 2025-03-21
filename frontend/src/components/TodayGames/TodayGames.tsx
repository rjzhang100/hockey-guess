import { useMemo } from "react";
import { NHLApiResponse } from "../../types/nhlTypes";
import { trpc } from "../../utils/trpc";
import GameGrid from "../GameGrid/GameGrid";

const TodayGames = () => {
  const today = useMemo(() => new Date(), []);
  const { data: rawData, isLoading } = trpc.nhl.getGames.useQuery({
    date: today,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  const todayGameData = (rawData as NHLApiResponse).at(0);

  if (!todayGameData) {
    return <>No games are on today.</>;
  }

  return (
    <>
      <div>Today's Games</div>
      <GameGrid gameData={todayGameData} />
    </>
  );
};

export default TodayGames;
