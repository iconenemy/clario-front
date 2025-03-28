import createClient, { type Middleware } from "openapi-fetch";

import { auth } from "@utils/auth";
import { ROUTE } from "@utils/routes";
import type { paths } from "./schema";

const authMiddleware: Middleware = {
  async onRequest({ schemaPath, request }) {
    const session = await auth();

    if (schemaPath.includes(ROUTE.SIGN_IN)) {
      return undefined;
    }

    request.headers.set("Authorization", `Bearer ${session?.access_token}`);
    return request;
  },
};

const client = createClient<paths>({
  baseUrl: "http://localhost:8000",
});

client.use(authMiddleware);

export { client };
