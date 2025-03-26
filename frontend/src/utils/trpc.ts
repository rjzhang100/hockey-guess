import type { AppRouter } from "../constants/server.d.ts";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>();
