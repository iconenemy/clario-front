import React, { ComponentProps } from "react";

const MainContainer = ({ children }: ComponentProps<"div">) => {
  return <div className="mt-20 w-full max-w-screen-lg mx-auto">{children}</div>;
};

export default MainContainer;
