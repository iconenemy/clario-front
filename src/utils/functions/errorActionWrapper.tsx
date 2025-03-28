import { FetchResponse } from "openapi-fetch";

import { CustomError } from "@utils/auth/auth.config";

type MediaType = `${string}/${string}`;

const errorActionWrapper = async <Options,>(
  client: Promise<FetchResponse<any, Options, MediaType>>
) => {
  try {
    const result = await client;

    if (result.error) {
      if (result?.error?.message) {
        throw new CustomError(result.error.message);
      }
    }

    return result.data;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new Error("Unexpected server error occurred during authorization");
    }
  }
};

export default errorActionWrapper;
