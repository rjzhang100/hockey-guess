"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("../trpc/trpc");
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../consts/env");
const server_1 = require("@trpc/server");
const zod_1 = __importDefault(require("zod"));
const date_fns_tz_1 = require("date-fns-tz");
const date_fns_1 = require("date-fns");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 3600 });
const nhlRouter = (0, trpc_1.router)({
    getGames: trpc_1.protectedProcedure
        .input(zod_1.default.object({
        date: zod_1.default.coerce.date(),
        tz: zod_1.default.string(),
    }))
        .query(async (opts) => {
        try {
            console.log(opts.ctx);
            const { date, tz } = opts.input;
            const zonedDate = (0, date_fns_tz_1.toZonedTime)(date, tz);
            const formattedDate = (0, date_fns_1.format)(zonedDate, "yyyy-MM-dd");
            const response = await axios_1.default.get(`${env_1.NHL_API}?startDate=${formattedDate}&endDate=${formattedDate}`);
            if (!response) {
                throw new Error("Failed to retrieve from NHL API");
            }
            return response.data;
        }
        catch (err) {
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to retrieve from NHL API: ${err.message}`,
            });
        }
    }),
    getTeamLogo: trpc_1.publicProcedure
        .input(zod_1.default.object({
        teamAbbrv: zod_1.default.string(),
        logoTheme: zod_1.default.string().optional(),
    }))
        .query(async (opts) => {
        try {
            const { teamAbbrv, logoTheme } = opts.input;
            const theme = logoTheme ?? "dark";
            const cachedLogo = cache.get(`${teamAbbrv}-${theme}`);
            if (cachedLogo) {
                return cachedLogo;
            }
            const response = await axios_1.default.get(`${env_1.NHL_LOGOS_API}/${teamAbbrv}_${theme}.svg`);
            if (response.data) {
                return response.data;
            }
            return opts;
        }
        catch (err) {
            console.log(err);
        }
    }),
});
exports.default = nhlRouter;
