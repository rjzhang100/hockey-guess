import { useMemo } from "react";
import { NHLApiResponse } from "../../types/nhlTypes";
import { trpc } from "../../utils/trpc";
import GameGrid from "../GameGrid/GameGrid";
import { CircularProgress } from "@mui/material";
import { toZonedTime } from "date-fns-tz";

const TodayGames = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = useMemo(() => toZonedTime(new Date(), timeZone), []);

  const { data: gameData, isLoading: isLoadingGames } =
    trpc.nhl.getGames.useQuery({
      date: new Date(today),
      tz: timeZone,
    });

  if (isLoadingGames) {
    return <CircularProgress />;
  }

  const todayGameData = (gameData as NHLApiResponse).at(0);

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
