import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ServerApiVersion } from "mongodb";
import { MONGODB_URI, PATH_TO_MONGODB_CERT, PORT } from "./consts/env";
import mongoose from "mongoose";
import { createContext, router } from "./trpc/trpc";
import dbUserRouter from "./api/dbUserRoutes";
import nhlRouter from "./api/nhlRoutes";
import authRouter from "./api/authRoutes";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const appRouter = router({
  db: dbUserRouter,
  nhl: nhlRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      tlsCertificateKeyFile: PATH_TO_MONGODB_CERT,
      serverApi: ServerApiVersion.v1,
    });
    console.log("Connected to mongodb");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("gracefully close mongo");
  process.exit(0);
});

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
