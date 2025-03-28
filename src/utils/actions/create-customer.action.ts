"use server";

import { client } from "@api";
import {
  createCustomerSchema,
  CreateCustomerFormType,
} from "@utils/schemas/create-customer.schema";
import errorActionWrapper from "@utils/functions/errorActionWrapper";

export async function createCustomer(formData: CreateCustomerFormType) {
  const validateData = await createCustomerSchema.parseAsync(formData);
  return errorActionWrapper(
    client.POST("/api/customer", { body: validateData })
  );
}
