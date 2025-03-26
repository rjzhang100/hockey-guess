"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const zod_1 = require("zod");
const trpc_1 = require("../trpc/trpc");
const server_1 = require("@trpc/server");
const consts_1 = require("../consts/consts");
const insertUser = async (userData) => {
    try {
        const user = new User_1.default({
            ...userData,
        });
        await user.save();
        return user;
    }
    catch (err) {
        console.log(err);
        throw new server_1.TRPCError({
            code: "CONFLICT",
            message: `Failed to insert user: ${err.message}`,
        });
    }
};
const getUser = async (userId) => {
    try {
        const user = await User_1.default.findOne({
            _id: userId,
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: "NOT_FOUND",
                message: `Failed to find user`,
            });
        }
        return user;
    }
    catch (err) {
        throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Failed to find user: ${err.message}`,
        });
    }
};
const userRouter = (0, trpc_1.router)({
    insertUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }))
        .mutation(async (opts) => {
        try {
            return await insertUser(opts.input);
        }
        catch (err) {
            throw err;
        }
    }),
    getUser: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string().regex(consts_1.ObjectIdRegex),
    }))
        .mutation(async (opts) => {
        const { userId } = opts.input;
        return await getUser(userId);
    }),
    getAllUsers: trpc_1.protectedProcedure.query(async (opts) => {
        try {
            const users = await User_1.default.find();
            const safeUsers = users.map((user) => ({
                name: user.name,
                email: user.email,
                gamesRight: user.gamesRight,
                gamesWrong: user.gamesWrong,
                percentRight: user.percentRight,
            }));
            return safeUsers;
        }
        catch (err) {
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong fetching users",
            });
        }
    }),
});
exports.default = userRouter;
