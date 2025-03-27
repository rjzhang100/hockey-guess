import { Stack, Typography } from "@mui/material";
import TeamLogo from "../TeamLogo/TeamLogo";
import { COLOURS } from "../../constants/styles";

const GameCardTeamInfo = ({
  teamAbbrv,
  locationName,
  teamName,
  side,
  theme,
  score,
  gameStarted,
}: {
  teamAbbrv: string;
  locationName: string;
  teamName: string;
  side: string;
  score?: number;
  theme?: string;
  gameStarted?: boolean;
}) => {
  return (
    <Stack color={theme ?? COLOURS.WHITE} alignItems="center">
      {gameStarted && (
        <Typography
          marginBottom="1rem"
          variant="h4"
          color={!!theme ? "#000000" : COLOURS.WHITE}
        >
          {score}
        </Typography>
      )}
      <TeamLogo teamAbbrv={teamAbbrv} logoTheme={theme} />
      <Typography align="center" variant="h6">
        {side}
      </Typography>
      <Typography align="center" variant="body1">
        {locationName} {teamName}
      </Typography>
    </Stack>
  );
};

export default GameCardTeamInfo;
