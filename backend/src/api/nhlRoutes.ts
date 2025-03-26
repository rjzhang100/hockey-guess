import { protectedProcedure, publicProcedure, router } from "../trpc/trpc";
import axios from "axios";
import { NHL_API, NHL_LOGOS_API } from "../consts/env";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

const nhlRouter = router({
  getGames: protectedProcedure
    .input(
      z.object({
        date: z.coerce.date(),
        tz: z.string(),
      })
    )
    .query(async (opts) => {
      try {
        const { date, tz } = opts.input;
        const zonedDate = toZonedTime(date, tz);
        const formattedDate = format(zonedDate, "yyyy-MM-dd");
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
  getTeamLogo: publicProcedure
    .input(
      z.object({
        teamAbbrv: z.string(),
        logoTheme: z.string().optional(),
      })
    )
    .query(async (opts) => {
      try {
        const { teamAbbrv, logoTheme } = opts.input;
        const theme = logoTheme ?? "dark";
        const cachedLogo = cache.get(`${teamAbbrv}-${theme}`);
        if (cachedLogo) {
          return cachedLogo;
        }
        const response = await axios.get(
          `${NHL_LOGOS_API}/${teamAbbrv}_${theme}.svg`
        );
        if (response.data) {
          return response.data;
        }
        return opts;
      } catch (err) {
        console.log(err);
      }
    }),
});

export default nhlRouter;
