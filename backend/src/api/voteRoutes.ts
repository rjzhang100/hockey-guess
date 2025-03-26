import Vote from "../models/Vote";
import { ObjectIdRegex } from "../consts/consts";
import { protectedProcedure, router } from "../trpc/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { JwtPayload } from "jsonwebtoken";

const voteRouter = router({
  castVote: protectedProcedure
    .input(
      z.object({
        gameHash: z.string(),
        votedFor: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const vote = new Vote({
          ...opts.input,
          userId: (opts.ctx.decodedToken as JwtPayload).userId,
        });
        await vote.save();
        return vote;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong casting your vote",
        });
      }
    }),
});

export default voteRouter;
