import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ServerApiVersion } from "mongodb";
import { MONGODB_URI, PATH_TO_MONGODB_CERT, PORT } from "./consts/env";
import mongoose from "mongoose";
import { publicProcedure, router } from "./trpc/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import dbRouter from "./api/dbRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const appRouter = router({
  db: dbRouter,
});

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

connectMongoDB().then(() => {
  const server = createHTTPServer({
    router: appRouter,
  });
  server.listen(PORT);
});
