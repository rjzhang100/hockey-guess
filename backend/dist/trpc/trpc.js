"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.router = exports.verifyUser = void 0;
exports.createContext = createContext;
const server_1 = require("@trpc/server");
const consts_1 = require("../consts/consts");
const env_1 = require("../consts/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createContext({ req, res }) {
    return { req, res };
}
const verifyUser = async () => { };
exports.verifyUser = verifyUser;
const t = server_1.initTRPC.context().create({});
exports.router = t.router;
exports.publicProcedure = t.procedure;
exports.protectedProcedure = t.procedure.use(async (opts) => {
    const { req } = opts.ctx;
    const token = req.cookies[consts_1.CONSTS.TOKEN_COOKIE_KEY];
    if (!token) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: `Not authenticated`,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        return opts.next({
            ctx: {
                decodedToken: decoded,
            },
        });
    }
    catch (err) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: `Bad JWT Token`,
        });
    }
});
