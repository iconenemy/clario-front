import { DeepMap, FieldError, FieldValues } from "react-hook-form";

import { Toast, ToasterToast } from "@hooks/use-toast";

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>;

export function errorHandlerForm(
  form: FieldErrors,
  error: Array<{ message: string; property: FieldErrors }> | string,
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  }
) {
  if (typeof error === "string") {
    toast({
      description: error,
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
    });
  } else {
    error.forEach(({ message, property }) => {
      form.setError(property, { message });
    });
  }
}
