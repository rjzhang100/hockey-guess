import {
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { trpc } from "../../utils/trpc";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { COLOURS } from "../../constants/styles";

const tableColumns = [
  "Name",
  "Correct Votes",
  "Incorrect Votes",
  "Percent Right",
  "Total Votes",
];

const UserStats = () => {
  const { data, isLoading } = trpc.user.getAllUsers.useQuery();
  if (isLoading) {
    return <CircularProgress />;
  }
  const { user: thisUser } = useContext(AuthContext);

  if (!data || data.length == 0) {
    return <Typography variant="h6">No users to show.</Typography>;
  }

  return (
    <>
      <Stack alignItems="center" rowGap="1rem">
        <Typography variant="h4">All User Stats</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableColumns.map((colName) => (
                  <TableCell key={colName}>{colName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{
                    backgroundColor:
                      user.name == thisUser.name
                        ? COLOURS.GREY_BACK_SHADE
                        : COLOURS.WHITE,
                  }}
                >
                  <TableCell>{`${user.name} ${
                    user.name == thisUser.name ? "(You)" : ""
                  }`}</TableCell>
                  <TableCell>{user.gamesRight}</TableCell>
                  <TableCell>{user.gamesWrong}</TableCell>
                  <TableCell>{`${user.percentRight.toPrecision(
                    4
                  )}%`}</TableCell>
                  <TableCell>{user.gamesRight + user.gamesWrong}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default UserStats;
