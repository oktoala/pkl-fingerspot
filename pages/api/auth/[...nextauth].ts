import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { password } = credentials as {
          password: string;
        };

        const user = await prisma.pegawai.findUnique({
          where: {
            pegawai_pin: password,
          },
        });

        if (!user && password === user!.pegawai_nip) {
          throw new Error("Error Login");
        }

        return { name: user?.pegawai_pin };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      const pegawaii = await prisma.pegawai.findUnique({
        where: {
          pegawai_pin: session.user?.name as string | undefined
        },
      });
      session.pegawai = pegawaii;
      return session;
    },
  },
};

export default NextAuth(authOptions);
