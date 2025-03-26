"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const env_1 = require("./consts/env");
const mongoose_1 = __importDefault(require("mongoose"));
const trpc_1 = require("./trpc/trpc");
const userRoutes_1 = __importDefault(require("./api/userRoutes"));
const nhlRoutes_1 = __importDefault(require("./api/nhlRoutes"));
const authRoutes_1 = __importDefault(require("./api/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_2 = require("@trpc/server/adapters/express");
const voteRoutes_1 = __importDefault(require("./api/voteRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.FRONTEND_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const appRouter = (0, trpc_1.router)({
    user: userRoutes_1.default,
    nhl: nhlRoutes_1.default,
    auth: authRoutes_1.default,
    vote: voteRoutes_1.default,
});
const connectMongoDB = async () => {
    try {
        await mongoose_1.default.connect(env_1.MONGODB_URI, {
            tlsCertificateKeyFile: env_1.PATH_TO_MONGODB_CERT,
            serverApi: mongodb_1.ServerApiVersion.v1,
        });
        console.log("Connected to mongodb");
    }
    catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
};
process.on("SIGINT", async () => {
    await mongoose_1.default.disconnect();
    console.log("gracefully close mongo");
    process.exit(0);
});
app.use("/api", (0, express_2.createExpressMiddleware)({
    router: appRouter,
    createContext: trpc_1.createContext,
}));
connectMongoDB().then(() => {
    app.listen(env_1.PORT, () => {
        console.log(`Server listening on port ${env_1.PORT}`);
    });
});
