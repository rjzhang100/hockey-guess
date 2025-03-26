import { Stack, Typography } from "@mui/material";
import TeamLogo from "../TeamLogo/TeamLogo";

const GameCardTeamInfo = ({
  teamAbbrv,
  locationName,
  teamName,
  side,
  theme,
}: {
  teamAbbrv: string;
  locationName: string;
  teamName: string;
  side: string;
  theme?: string;
}) => {
  return (
    <Stack color={theme ?? "white"} alignItems="center">
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
