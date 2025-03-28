"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@ui/input";
import { useToast } from "@/hooks/use-toast";

import { ROUTE } from "@utils/routes";
import {
  CreateCustomerFormType,
  createCustomerSchema,
} from "@utils/schemas/create-customer.schema";
import SubmitButton from "@ui/custom/SubmitButton";
import { errorHandlerForm } from "@utils/functions/errorHandlerForm";
import { createCustomer } from "@utils/actions/create-customer.action";

const CreateCustomerForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreateCustomerFormType>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit(formData: CreateCustomerFormType) {
    await createCustomer(formData)
      .then(({ message }) => {
        toast({
          description: message,
          variant: "success",
          title: "Success!",
        });
        router.push(ROUTE.CUSTOMERS);
      })
      .catch((error: Error) => {
        const parsedError = JSON.parse(error.message);
        errorHandlerForm(form, parsedError, toast);
      });
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-center">
              Create customer
            </h3>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Name</FormLabel>
                      </div>
                      <FormControl>
                        <Input type="text" placeholder="Alex" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SubmitButton>Create customer</SubmitButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCustomerForm;
