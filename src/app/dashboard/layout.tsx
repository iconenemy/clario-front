import { ComponentProps } from "react";

import Header from "@components/layout/Header";
import MainContainer from "@components/dashboard/layout/MainContainer";

export default async function DashboardLayout({
  children,
}: ComponentProps<"div">) {
  return (
    <div>
      <Header />
      <MainContainer>{children}</MainContainer>
    </div>
  );
}
