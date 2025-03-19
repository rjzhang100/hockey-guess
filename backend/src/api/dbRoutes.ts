import User, { IUser } from "../models/User";
import { z } from "zod";
import { publicProcedure, router } from "../trpc/trpc";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts/env";

const loginUser = async (userData: any) => {
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
    return token;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to login user: ${(err as Error).message}`,
    });
  }
};

const insertUser = async (userData: any) => {
  try {
    const user = new User({
      ...userData,
    });
    await user.save();
    return user;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to insert user: ${(err as Error).message}`,
    });
  }
};

const getUser = async (userEmail: any) => {
  try {
    const user = await User.findOne({
      email: userEmail,
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Failed to find user by email`,
      });
    }
    return user;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to find user by email: ${(err as Error).message}`,
    });
  }
};

const dbRouter = router({
  insertUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      return await insertUser(opts.input);
    }),
  getUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { email } = opts.input;
      return await getUser(email);
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      return await loginUser(opts.input);
    }),
});

export default dbRouter;
