import NextAuth from "next-auth";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  pages: {
    signIn: "auth/sign-in",
  },
  ...authConfig,
});
