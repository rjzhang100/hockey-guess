import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ServerApiVersion } from "mongodb";
import { CERT, FRONTEND_ORIGIN, MONGODB_URI, PORT } from "./consts/env";
import mongoose from "mongoose";
import { createContext, router } from "./trpc/trpc";
import userRouter from "./api/userRoutes";
import nhlRouter from "./api/nhlRoutes";
import authRouter from "./api/authRoutes";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import voteRouter from "./api/voteRoutes";
import fs from "fs";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const appRouter = router({
  user: userRouter,
  nhl: nhlRouter,
  auth: authRouter,
  vote: voteRouter,
});

export type AppRouter = typeof appRouter;

const connectMongoDB = async () => {
  try {
    const certPath = "./temp/cert.pem";
    if (!CERT) {
      throw new Error("Failed to find Mongo cert");
    }
    fs.writeFileSync(certPath, Buffer.from(CERT, "base64"));

    await mongoose.connect(MONGODB_URI, {
      tlsCertificateKeyFile: certPath,
      serverApi: ServerApiVersion.v1,
    });
    console.log("Connected to mongodb");
    fs.unlinkSync(certPath);
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
