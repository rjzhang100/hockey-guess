import { TRPCError } from "@trpc/server";
import { JWT_SECRET } from "../consts/env";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { publicProcedure, router } from "../trpc/trpc";
import { z } from "zod";
import { Response } from "express";

const loginUser = async (userData: any, res: Response) => {
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
    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Only set the cookie over HTTPS in production
      sameSite: "strict",
      maxAge: 3600000,
    });
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Failed to login user: ${(err as Error).message}`,
    });
  }
};

const authRouter = router({
  //   loginUser: publicProcedure
  //     .input(
  //       z.object({
  //         email: z.string(),
  //         password: z.string(),
  //       })
  //     )
  //     .mutation(async (opts) => {
  //       return await loginUser(opts.input, opts.ctx.res);
  //     }),
});

export default authRouter;
