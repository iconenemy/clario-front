import { redirect } from "next/navigation";

import { auth } from "@utils/auth";
import { ROUTE } from "@utils/routes";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect(ROUTE.CUSTOMERS);
  else redirect(ROUTE.SIGN_IN);
}
