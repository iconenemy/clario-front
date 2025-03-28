import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@ui/button";
import { ROUTE } from "@utils/routes";
import { auth, signOut } from "@utils/auth";

const AuthSessionButton = async () => {
  const session = await auth();

  return (
    <div>
      {session?.access_token ? (
        <form
          action={async () => {
            "use server";
            await signOut().then(() => redirect(ROUTE.SIGN_IN));
          }}
        >
          <Button type="submit" className="w-full flex items-center gap-2">
            SignOut
          </Button>
        </form>
      ) : (
        <div className="w-56 flex items-center justify-between">
          <Link href={ROUTE.SIGN_IN}>
            <Button>SignIn</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSessionButton;
