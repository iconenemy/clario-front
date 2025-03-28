import { redirect } from "next/navigation";

import { auth } from "@utils/auth";
import { ROUTE } from "@utils/routes";
import SignInForm from "@components/auth/SignInForm";
import AuthFormContainer from "@components/auth/AuthFormContainer";

export default async function SingInPage() {
  const session = await auth();
  if (session) redirect(ROUTE.CUSTOMERS);

  return (
    <AuthFormContainer>
      <SignInForm />
    </AuthFormContainer>
  );
}
