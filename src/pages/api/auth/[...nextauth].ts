import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      type: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Input your username" },
        password: { label: "Password", type: "password", placeholder: "Input your password" },
      },
      async authorize(credentials, req) {
        const userCredentials = {
          username: credentials?.username,
          password: credentials?.password,
        };

        try {
          const res = await fetch(
            `http://localhost:3000/${process.env.BASE_PATH}/api/users/login`,
            {
              method: "POST",
              body: JSON.stringify(userCredentials),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = await res.json();

          if (res.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  debug: process.env.DEBUG === "true",
};

export default NextAuth(options);
