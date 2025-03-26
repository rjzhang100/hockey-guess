import Vote from "../models/Vote";
import { Context, protectedProcedure, router } from "../trpc/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

const getVotesByGame = async (gameId: String) => {
  try {
    const votes = await Vote.find({ gameId });
    return votes;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong on the server",
    });
  }
};

const voteRouter = router({
  castVote: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        userName: z.string(),
        gameId: z.string(),
        votedFor: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { gameId, votedFor, userName } = opts.input;
        const vote = new Vote({
          gameId: gameId,
          votedFor: votedFor,
          userName: userName,
          userId: (opts.ctx.decodedToken as JwtPayload).userId,
          voteCounted: false,
        });

        await vote.save();
        return vote;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong casting your vote",
        });
      }
    }),
  getVoteByGameByUser: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .query(async (opts) => {
      const { gameId } = opts.input;
      try {
        const vote = await Vote.findOne({
          gameId: gameId,
          userId: (opts.ctx.decodedToken as JwtPayload).userId,
        });
        if (!vote) {
          return null;
        }
        return vote;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong on the server",
        });
      }
    }),
  getVotesByGame: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .query(async (opts) => {
      const { gameId } = opts.input;
      return getVotesByGame(gameId);
    }),
  tallyVotesForGame: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        gameWinner: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { gameId, gameWinner } = opts.input;
        const votes = await getVotesByGame(gameId);

        for (const vote of votes) {
          const userId = vote.userId;
          if (!vote.voteCounted) {
            if (vote.votedFor === gameWinner) {
              await User.findByIdAndUpdate(userId, {
                $inc: { gamesRight: 1 },
              });
            } else {
              await User.findByIdAndUpdate(userId, {
                $inc: {
                  gamesWrong: 1,
                },
              });
            }

            await Vote.findByIdAndUpdate(vote._id, {
              $set: {
                voteCounted: true,
              },
            });
          }
          const user = await User.findById(userId);
          if (!user) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to tally votes for game",
            });
          }
          await User.findByIdAndUpdate(userId, {
            $set: {
              percentRight:
                (user.gamesRight / (user.gamesRight + user.gamesWrong)) * 100,
            },
          });
        }
        return;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to tally votes for game",
        });
      }
    }),
});

export default voteRouter;
