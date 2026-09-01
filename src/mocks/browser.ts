import { setupWorker } from "msw/browser";

import { blogHandlers } from "./handlers/blog.handlers";

export const worker = setupWorker(...blogHandlers);
