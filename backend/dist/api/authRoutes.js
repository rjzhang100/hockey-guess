"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const env_1 = require("../consts/env");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const trpc_1 = require("../trpc/trpc");
const zod_1 = require("zod");
const consts_1 = require("../consts/consts");
const loginUser = async (userData, ctx) => {
    try {
        const { email, password } = userData;
        const user = await User_1.default.findOne({
            email,
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: "NOT_FOUND",
                message: `Failed to find user to login`,
            });
        }
        if (!(await user.comparePassword(password))) {
            throw new server_1.TRPCError({
                code: "UNAUTHORIZED",
                message: `Wrong password, try again`,
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.email,
        }, env_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        ctx.res.cookie(consts_1.CONSTS.TOKEN_COOKIE_KEY, token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        return user;
    }
    catch (err) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: `Failed to login user: ${err.message}`,
        });
    }
};
const authRouter = (0, trpc_1.router)({
    loginUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }))
        .mutation(async (opts) => {
        return await loginUser(opts.input, opts.ctx);
    }),
    checkLoggedIn: trpc_1.protectedProcedure.query(() => {
        return {
            loggedIn: true,
        };
    }),
    getSignedInUser: trpc_1.protectedProcedure.query(async (opts) => {
        const userId = opts.ctx.decodedToken.userId;
        try {
            const thisUser = await User_1.default.findById(userId);
            if (!thisUser) {
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong with auth... text Ray",
                });
            }
            return {
                id: thisUser.id,
                name: thisUser.name,
                email: thisUser.email,
            };
        }
        catch (err) {
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong with auth... text Ray",
            });
        }
    }),
});
exports.default = authRouter;
