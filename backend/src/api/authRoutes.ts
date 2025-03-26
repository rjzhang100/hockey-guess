import { TRPCError } from "@trpc/server";
import { JWT_SECRET } from "../consts/env";
import User from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  Context,
  protectedProcedure,
  publicProcedure,
  router,
} from "../trpc/trpc";
import { z } from "zod";
import { CONSTS } from "../consts/consts";

const loginUser = async (userData: any, ctx: Context) => {
  try {
    const { email, password } = userData;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Failed to find user to login`,
      });
    }
    if (!(await user.comparePassword(password))) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Wrong password, try again`,
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    ctx.res.cookie(CONSTS.TOKEN_COOKIE_KEY, token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return user;
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Failed to login user: ${(err as Error).message}`,
    });
  }
};

const authRouter = router({
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      return await loginUser(opts.input, opts.ctx);
    }),
  checkLoggedIn: protectedProcedure.query(() => {
    console.log("LOGGED IN");
    return {
      loggedIn: true,
    };
  }),
  getSignedInUser: protectedProcedure.query(async (opts) => {
    const userId = (opts.ctx.decodedToken as JwtPayload).userId;
    try {
      const thisUser = await User.findById(userId);
      if (!thisUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong with auth... text Ray",
        });
      }
      return {
        id: thisUser.id,
        name: thisUser.name,
        email: thisUser.email,
      };
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong with auth... text Ray",
      });
    }
  }),
});

export default authRouter;
