import { Game, NHLApiResponse } from "../../types/nhlTypes";
import { trpc } from "../../utils/trpc";
import { hashGameData } from "../../utils/utils";

const TodayGames = () => {
  const { data: rawData, isLoading } = trpc.nhl.getTodaysGames.useQuery();
  const data = rawData as NHLApiResponse;

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <div>Today is {data.date.pretty}</div>
          </div>
          <div>
            <div>Today's hockey games:</div>
            {data.games.map((game: Game, index) => (
              <div
                key={hashGameData({
                  home: game.teams.home,
                  away: game.teams.away,
                  date: data.date.raw,
                })}
              >
                <div>Game {index + 1}:</div>
                <div>
                  {game.teams.away.locationName} {game.teams.away.teamName}
                </div>
                <div>VS</div>
                <div>
                  {game.teams.home.locationName} {game.teams.home.teamName}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};
export default TodayGames;
