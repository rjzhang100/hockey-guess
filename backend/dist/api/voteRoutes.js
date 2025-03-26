"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vote_1 = __importDefault(require("../models/Vote"));
const trpc_1 = require("../trpc/trpc");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const User_1 = __importDefault(require("../models/User"));
const getVotesByGame = async (gameId) => {
    try {
        const votes = await Vote_1.default.find({ gameId });
        return votes;
    }
    catch (err) {
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong on the server",
        });
    }
};
const voteRouter = (0, trpc_1.router)({
    castVote: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
        userName: zod_1.z.string(),
        gameId: zod_1.z.string(),
        votedFor: zod_1.z.string(),
    }))
        .mutation(async (opts) => {
        try {
            const { gameId, votedFor, userName } = opts.input;
            const vote = new Vote_1.default({
                gameId: gameId,
                votedFor: votedFor,
                userName: userName,
                userId: opts.ctx.decodedToken.userId,
                voteCounted: false,
            });
            await vote.save();
            return vote;
        }
        catch (err) {
            console.log(err);
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong casting your vote",
            });
        }
    }),
    getVoteByGameByUser: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        gameId: zod_1.z.string(),
    }))
        .query(async (opts) => {
        const { gameId } = opts.input;
        try {
            const vote = await Vote_1.default.findOne({
                gameId: gameId,
                userId: opts.ctx.decodedToken.userId,
            });
            if (!vote) {
                return null;
            }
            return vote;
        }
        catch (err) {
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong on the server",
            });
        }
    }),
    getVotesByGame: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        gameId: zod_1.z.string(),
    }))
        .query(async (opts) => {
        const { gameId } = opts.input;
        return getVotesByGame(gameId);
    }),
    tallyVotesForGame: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        gameId: zod_1.z.string(),
        gameWinner: zod_1.z.string(),
    }))
        .mutation(async (opts) => {
        try {
            const { gameId, gameWinner } = opts.input;
            const votes = await getVotesByGame(gameId);
            for (const vote of votes) {
                const userId = vote.userId;
                if (!vote.voteCounted) {
                    if (vote.votedFor === gameWinner) {
                        await User_1.default.findByIdAndUpdate(userId, {
                            $inc: { gamesRight: 1 },
                        });
                    }
                    else {
                        await User_1.default.findByIdAndUpdate(userId, {
                            $inc: {
                                gamesWrong: 1,
                            },
                        });
                    }
                    await Vote_1.default.findByIdAndUpdate(vote._id, {
                        $set: {
                            voteCounted: true,
                        },
                    });
                }
                const user = await User_1.default.findById(userId);
                if (!user) {
                    throw new server_1.TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to tally votes for game",
                    });
                }
                await User_1.default.findByIdAndUpdate(userId, {
                    $set: {
                        percentRight: (user.gamesRight / (user.gamesRight + user.gamesWrong)) * 100,
                    },
                });
            }
            return;
        }
        catch (err) {
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to tally votes for game",
            });
        }
    }),
});
exports.default = voteRouter;
