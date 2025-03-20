import User from "../models/User";
import { z } from "zod";
import { publicProcedure, router } from "../trpc/trpc";
import { TRPCError } from "@trpc/server";

const insertUser = async (userData: any) => {
  try {
    const user = new User({
      ...userData,
    });
    await user.save();
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw new TRPCError({
      code: "CONFLICT",
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

const dbUserRouter = router({
  insertUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        return await insertUser(opts.input);
      } catch (err) {
        throw err;
      }
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
});

export default dbUserRouter;
