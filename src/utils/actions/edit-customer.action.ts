"use server";

import { client } from "@api";
import {
  editCustomerSchema,
  EditCustomerFormType,
} from "@utils/schemas/edit-customer.schema";
import errorActionWrapper from "@utils/functions/errorActionWrapper";

export async function editCustomer(id: string, formData: EditCustomerFormType) {
  const validateData = await editCustomerSchema.parseAsync(formData);
  return errorActionWrapper(
    client.PATCH("/api/customer/{id}", {
      body: validateData,
      params: { path: { id } },
    })
  );
}
