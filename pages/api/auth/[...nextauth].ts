// import { PrismaClient } from "@prisma/client";
import { RequestInternal, Awaitable, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async function (
        credentials: Record<never, string> | undefined,
        req: Pick<RequestInternal, "query" | "headers" | "body" | "method">
      ): Promise<Omit<User, "id"> | { id?: string | undefined } | null> {
        console.log(req.body?.nip);
        throw new Error("Function not implemented.");
      },
    }),
  ],
  callbacks: {
    jwt: async function (params): Promise<JWT> {
      const { token, user } = params;
      if (user) {
        token.name = user.name;
      }
      return token;
    },
    session: async  (params): Promise<Session> => {
      const {session, token} = params;
      session.user = {
        name: token.name
      };
      return session;
    }
  },
  pages: {
    signIn: "login"
  }
});
