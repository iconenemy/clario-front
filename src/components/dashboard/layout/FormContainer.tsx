import { ComponentProps } from "react";

const FormContainer = ({ children }: ComponentProps<"div">) => {
  return <div className="w-full max-w-screen-sm mx-auto">{children}</div>;
};

export default FormContainer;
