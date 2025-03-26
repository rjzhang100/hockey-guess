import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import GameCardTeamInfo from "../GameCardTeamInfo/GameCardTeamInfo";
import { Game } from "../../types/nhlTypes";
import { FC, useContext, useState } from "react";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { errorMap } from "../../constants/errorMap";
import { AuthContext } from "../../contexts/AuthContext";
import VoteTable from "../VoteTable/VoteTable";

interface IGameCardDialogProps {
  gameId: string;
  gameInfo: Game;
  closeDialog: () => void;
  votingClosed: boolean;
  voteCorrect?: boolean;
}

const GameCardDialog: FC<IGameCardDialogProps> = ({
  gameId,
  gameInfo,
  closeDialog,
  votingClosed,
  voteCorrect,
}) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const { user } = useContext(AuthContext);
  const voteMutation = trpc.vote.castVote.useMutation({
    onError(error) {
      const { data } = error;
      toast(errorMap[data?.code || "DEFAULT"], {
        type: "error",
      });
    },
    onSuccess() {
      toast(`Successfully voted for ${selectedTeam}`, {
        type: "success",
      });
      closeDialog();
    },
  });

  const handleSubmitVote = () => {
    voteMutation.mutate({
      userId: user.id,
      userName: user.name,
      gameId: gameId,
      votedFor: selectedTeam,
    });
  };

  return (
    <>
      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        {!votingClosed && (
          <Typography variant="h5">Pick Your Winner!</Typography>
        )}
        <Grid2
          container
          gap={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Grid2 size={5}>
            <Stack gap={"1rem"}>
              <GameCardTeamInfo
                teamAbbrv={gameInfo.teams.home.abbreviation}
                locationName={gameInfo.teams.home.locationName}
                teamName={gameInfo.teams.home.teamName}
                side="Home"
                theme="light"
              />
              {!votingClosed && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedTeam(gameInfo.teams.home.locationName);
                    setShowConfirm(true);
                  }}
                >
                  Vote for {gameInfo.teams.home.locationName}
                </Button>
              )}
            </Stack>
          </Grid2>
          <Grid2 size={5}>
            <Stack gap={"1rem"}>
              <GameCardTeamInfo
                teamAbbrv={gameInfo.teams.away.abbreviation}
                locationName={gameInfo.teams.away.locationName}
                teamName={gameInfo.teams.away.teamName}
                side="Away"
                theme="light"
              />
              {!votingClosed && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedTeam(gameInfo.teams.away.locationName);
                    setShowConfirm(true);
                  }}
                >
                  Vote for {gameInfo.teams.away.locationName}
                </Button>
              )}
            </Stack>
          </Grid2>
        </Grid2>
        <VoteTable
          gameId={gameId}
          gameStatus={gameInfo.status}
          voteCorrect={voteCorrect}
        />
      </Stack>
      {showConfirm && (
        <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
          <DialogContent>
            <Stack alignItems="center" gap="1rem">
              <Typography variant="body1">
                Are you sure you want to vote for {selectedTeam}? You can't undo
                this.
              </Typography>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    setShowConfirm(false);
                    handleSubmitVote();
                  }}
                >
                  Yes
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setShowConfirm(false)}
                >
                  No
                </Button>
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GameCardDialog;
