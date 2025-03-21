import { protectedProcedure, publicProcedure, router } from "../trpc/trpc";
import axios from "axios";
import { NHL_API } from "../consts/env";
import { TRPCError } from "@trpc/server";
import z from "zod";

const nhlRouter = router({
  getTodaysGames: protectedProcedure.query(async () => {
    try {
      const response = await axios.get(`${NHL_API}/latest`);
      if (!response) {
        throw new Error("Failed to retrieve from NHL API");
      }
      return response.data;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to retrieve from NHL API: ${(err as Error).message}`,
      });
    }
  }),
  getGames: publicProcedure
    .input(
      z.object({
        date: z.coerce.date(),
      })
    )
    .query(async (opts) => {
      try {
        const { date } = opts.input;
        console.log(date);
        const formattedDate = date.toISOString().split("T")[0];
        const response = await axios.get(
          `${NHL_API}?startDate=${formattedDate}&endDate=${formattedDate}`
        );
        if (!response) {
          throw new Error("Failed to retrieve from NHL API");
        }
        return response.data;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to retrieve from NHL API: ${(err as Error).message}`,
        });
      }
    }),
});

export default nhlRouter;
