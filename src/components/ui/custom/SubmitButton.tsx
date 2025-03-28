import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@ui/button";

const SubmitButton = ({
  children,
  className,
  ...props
}: ComponentProps<"button">) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      {...props}
      className={cn("w-full", className)}
    >
      {pending && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};

export default SubmitButton;
