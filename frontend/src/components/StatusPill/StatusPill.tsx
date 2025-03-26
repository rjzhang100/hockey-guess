import { Box, Typography } from "@mui/material";
import { GameStatus } from "../../types/nhlTypes";
import { FC } from "react";

interface IStatusPill {
  gameStatus: GameStatus;
}

const StatusColorMap: Record<string, string> = {
  FINAL: "blue",
  LIVE: "red",
  PREVIEW: "grey",
  POSTPONED: "yellow",
};

const StatusPill: FC<IStatusPill> = ({ gameStatus }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingY="4px"
        paddingX="8px"
        borderRadius="8px"
        border="1px solid grey"
      >
        <Box
          width="10px"
          height="10px"
          bgcolor={StatusColorMap[gameStatus.state]}
          borderRadius="50%"
          marginRight="4px"
        />
        <Typography variant="body2">{gameStatus.state}</Typography>
      </Box>
    </>
  );
};

export default StatusPill;
