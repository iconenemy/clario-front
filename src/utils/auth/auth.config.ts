import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthError, CredentialsSignin, NextAuthConfig } from "next-auth";

import { client } from "@api";

export class CustomError extends CredentialsSignin {
  code: string;
  message: string;

  constructor(
    errorMessage: Array<{ message: string; property: string }> | string
  ) {
    super();
    this.code = "AuthError";
    this.message = JSON.stringify(errorMessage);
  }
}

export default {
  providers: [
    CredentialsProvider({
      id: "EmailForm",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const result = await client.POST("/api/auth/login", {
            body: { email, password },
          });

          if (result.error) {
            throw new CustomError(result.error.message);
          }

          if (!result.data) {
            throw new Error(
              "Unexpected server error occurred during authorization"
            );
          }

          return { ...result.data, language: "en" };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      console.log("token: ", token);

      if (trigger === "update" && session.language) {
        token.language = session.language;
      }

      if (user) {
        token = { ...user, ...token };
      }

      if (!token.access_token) {
        throw new AuthError("Missing tokens");
      }

      const decodedAccessToken = jwtDecode(token.access_token);
      token.access_exp = decodedAccessToken.exp;

      if (token.access_exp && Date.now() / 1000 > token.access_exp)
        throw new AuthError("Refresh token is invalid or expired");

      return token;
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token;
      session.language = token.language;
      return session;
    },
  },
} satisfies NextAuthConfig;
