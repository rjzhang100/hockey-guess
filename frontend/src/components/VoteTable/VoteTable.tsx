import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
  TableBody,
  Divider,
} from "@mui/material";
import { trpc } from "../../utils/trpc";
import { GameStatus } from "../../types/nhlTypes";
import { COLOURS } from "../../constants/styles";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const VoteTable = ({
  gameId,
  gameStatus,
  voteCorrect,
}: {
  gameId: string;
  gameStatus: GameStatus;
  voteCorrect?: boolean;
}) => {
  const { data: votes, isLoading } = trpc.vote.getVotesByGame.useQuery({
    gameId,
  });
  const { user: thisUser } = useContext(AuthContext);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!votes || votes.length == 0) {
    return (
      <Typography
        sx={{
          marginTop: "1rem",
        }}
        variant="h6"
      >
        No Votes Yet
      </Typography>
    );
  }

  const getBackgroundColour = () => {
    if (gameStatus.state != "FINAL") {
      return COLOURS.WHITE;
    }
    return voteCorrect ? COLOURS.SUCCESS_GREEN : COLOURS.ERROR_RED;
  };

  return (
    <TableContainer
      sx={{
        marginTop: "1rem",
      }}
    >
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Vote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {votes.map((vote: any) => (
            <TableRow
              key={vote._id}
              sx={{
                backgroundColor: getBackgroundColour(),
              }}
            >
              <TableCell align="center">{`${vote.userName} ${
                vote.userName == thisUser.name ? "(You)" : ""
              }`}</TableCell>
              <TableCell align="center">{vote.votedFor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VoteTable;
