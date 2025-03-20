import type { AppRouter } from "../../../backend/src/server";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>();
