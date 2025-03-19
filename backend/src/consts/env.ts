import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const PATH_TO_MONGODB_CERT = process.env.PATH_TO_CERT as string;
export const MONGODB_URI = process.env.MONGODB_URI as string;
