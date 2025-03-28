import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ServerApiVersion } from "mongodb";
import { CERT, ENV, FRONTEND_ORIGINS, MONGODB_URI, PORT } from "./consts/env";
import mongoose from "mongoose";
import { createContext, router } from "./trpc/trpc";
import userRouter from "./api/userRoutes";
import nhlRouter from "./api/nhlRoutes";
import authRouter from "./api/authRoutes";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import voteRouter from "./api/voteRoutes";
import fs from "fs";
import path from "path";
import os from "os";
dotenv.config();

const app = express();

let allowedOrigins;

if (ENV == "prod") {
  allowedOrigins = FRONTEND_ORIGINS.split(",");
} else {
  allowedOrigins = ["http://localhost:5173"];
}

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      console.log(allowedOrigins);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow all relevant HTTP methods
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
    if (!CERT) {
      throw new Error("Failed to find Mongo cert");
    }

    const certBuffer = Buffer.from(CERT, "base64");

    const tempCertPath = path.join(os.tmpdir(), "cert.pem");

    fs.writeFileSync(tempCertPath, certBuffer);
    await mongoose.connect(MONGODB_URI, {
      tlsCertificateKeyFile: tempCertPath,
      serverApi: ServerApiVersion.v1,
    });
    console.log("Connected to mongodb");
    fs.unlinkSync(tempCertPath);
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
