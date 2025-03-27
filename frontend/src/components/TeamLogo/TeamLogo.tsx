import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import { trpc } from "../../utils/trpc";

interface ITeamLogoProps {
  teamAbbrv: string;
  logoTheme?: string;
}

const TeamLogo: FC<ITeamLogoProps> = ({ teamAbbrv, logoTheme }) => {
  const { data, isLoading } = trpc.nhl.getTeamLogo.useQuery({
    teamAbbrv,
    logoTheme,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box width={["100px", "150px"]}>
      <img
        style={{
          width: "100%",
        }}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(data)}`}
      />
    </Box>
  );
};

export default TeamLogo;
