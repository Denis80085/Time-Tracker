import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server/server.ts";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
