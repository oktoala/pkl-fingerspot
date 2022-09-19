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

        if (user && password === user.pegawai_nip) {
          return user;
        }
      throw new Error('Error Login');
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
