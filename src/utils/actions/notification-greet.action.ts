"use server";

import { client } from "@api";
import errorActionWrapper from "@utils/functions/errorActionWrapper";

export type Language = "en" | "uk";

export async function notificationGreet(language: string) {
  return errorActionWrapper(
    client.GET("/api/greet", {
      params: { header: { "Accept-Language": language as Language } },
    })
  );
}
