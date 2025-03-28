"use client";

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
import { ROUTE } from "@utils/routes";
import { useToast } from "@/hooks/use-toast";
import SubmitButton from "@ui/custom/SubmitButton";
import { signInUser } from "@utils/actions/sign-in.action";
import { errorHandlerForm } from "@utils/functions/errorHandlerForm";
import { SignInFormType, signInSchema } from "@utils/schemas/sign-in.schema";

const SignInForm = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">) => {
  const { toast } = useToast();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignInFormType) {
    await signInUser(formData).catch((error: Error) => {
      if (isRedirectError(error)) {
        return redirect(ROUTE.CUSTOMERS);
      } else {
        console.log("Error: ", error);
        const parsedError = JSON.parse(error.message);
        errorHandlerForm(form, parsedError, toast);
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-center">
              Welcome back to Clario
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SubmitButton>Sign In</SubmitButton>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignInForm;
