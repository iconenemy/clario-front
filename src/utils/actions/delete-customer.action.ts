"use server";

import { client } from "@api";
import errorActionWrapper from "@utils/functions/errorActionWrapper";

export async function deleteCustomer(id: string) {
  return errorActionWrapper(
    client.DELETE("/api/customer/{id}", { params: { path: { id } } })
  );
}
