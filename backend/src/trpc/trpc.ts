import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { CONSTS } from "../consts/consts";
import { JWT_SECRET } from "../consts/env";
import jwt from "jsonwebtoken";

export function createContext({ req, res }: CreateExpressContextOptions) {
  return { req, res };
}

export type Context = Awaited<ReturnType<typeof createContext>> & {
  decodedToken?: any;
};

export const verifyUser = async () => {};

const t = initTRPC.context<Context>().create({});
export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
  const { req } = opts.ctx;
  const token = req.cookies[CONSTS.TOKEN_COOKIE_KEY];
  console.log(token);
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Not authenticated`,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return opts.next({
      ctx: {
        decodedToken: decoded,
      },
    });
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Bad JWT Token`,
    });
  }
});
