import { FC, useMemo } from "react";
import { NHLApiResponse } from "../../types/nhlTypes";
import { trpc } from "../../utils/trpc";
import GameGrid from "../GameGrid/GameGrid";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { toZonedTime } from "date-fns-tz";
import { getTomorrow, getYesterday } from "../../utils/utils";
import { DAYS } from "../../constants/consts";

const NameToDate: Record<string, Date> = {
  Today: new Date(),
  Yesterday: getYesterday(),
  Tomorrow: getTomorrow(),
};

export interface IGamePageProps {
  day: DAYS;
}

const GamePage: FC<IGamePageProps> = ({ day }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = useMemo(() => toZonedTime(NameToDate[day], timeZone), []);

  const { data, isLoading } = trpc.nhl.getGames.useQuery({
    date: new Date(date),
    tz: timeZone,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  const gameData = (data as NHLApiResponse).at(0);

  if (!gameData) {
    return <>No games to show.</>;
  }

  return (
    <Stack alignItems="center" rowGap="1rem">
      <Typography variant="h4">{`${day}'s Games`}</Typography>
      <Typography variant="h5">{gameData.date.pretty}</Typography>
      <GameGrid gameData={gameData} />
    </Stack>
  );
};

export default GamePage;
