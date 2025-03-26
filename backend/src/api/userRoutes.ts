import User from "../models/User";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc/trpc";
import { TRPCError } from "@trpc/server";
import { ObjectIdRegex } from "../consts/consts";

const insertUser = async (userData: any) => {
  try {
    const user = new User({
      ...userData,
    });
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    throw new TRPCError({
      code: "CONFLICT",
      message: `Failed to insert user: ${(err as Error).message}`,
    });
  }
};

const getUser = async (userId: any) => {
  try {
    const user = await User.findOne({
      _id: userId,
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Failed to find user`,
      });
    }
    return user;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to find user: ${(err as Error).message}`,
    });
  }
};

const userRouter = router({
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
  getUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().regex(ObjectIdRegex),
      })
    )
    .mutation(async (opts) => {
      const { userId } = opts.input;
      return await getUser(userId);
    }),
  getAllUsers: protectedProcedure.query(async () => {
    try {
      const users = await User.find();
      const safeUsers = users.map((user) => ({
        name: user.name,
        email: user.email,
        gamesRight: user.gamesRight,
        gamesWrong: user.gamesWrong,
        percentRight: user.percentRight,
      }));
      return safeUsers;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong fetching users",
      });
    }
  }),
});

export default userRouter;
