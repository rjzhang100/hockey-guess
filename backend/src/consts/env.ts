import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const NHL_API = process.env.NHL_API as string;
export const NHL_LOGOS_API = process.env.NHL_LOGOS_API as string;
export const FRONTEND_ORIGIN = (process.env.FRONTEND_ORIGIN ??
  "http:localhost:5173") as string;
export const CERT = process.env.CERT as string;
