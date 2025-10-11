import { setupWorker } from "msw/browser";
import { handlers } from "../server/handlers.ts";

export const worker = setupWorker(...handlers);
