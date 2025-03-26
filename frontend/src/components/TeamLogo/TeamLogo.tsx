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
    <img
      style={{
        width: "150px",
      }}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(data)}`}
    />
  );
};

export default TeamLogo;
