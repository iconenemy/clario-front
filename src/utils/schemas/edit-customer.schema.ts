import { z } from "zod";

export const editCustomerSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(32, { message: "Name must be at least 32 characters." }),
});

export type EditCustomerFormType = z.infer<typeof editCustomerSchema>;
