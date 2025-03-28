import { ComponentProps } from "react";

const AuthFormContainer = ({ children, ...props }: ComponentProps<"div">) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm min-h-[550px]" {...props}>
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
