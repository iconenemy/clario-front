declare module "next-auth" {
  interface User {
    language: string;
    access_exp?: number;
    access_token: string;
  }

  interface Session {
    language: string;
    access_exp?: number;
    access_token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    language: string;
    access_exp?: number;
    access_token: string;
  }
}
