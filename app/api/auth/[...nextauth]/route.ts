import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// import the prisma db
import prisma from "@/app/lib/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // - will handle the email and password authentication, if the user decided not to use github or google authentication
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // - fields
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // - compare what user typed in the input, to the database
      async authorize(credentials) {
        // - check if email and password exists in credential
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // - create the user
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // - check if the user exists or it doesn't have hashed password, which means they registered by other providers
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        // - check if the password is correct
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) throw new Error("Invalid Credentials");

        // - if everything is okay, just return the user
        return user;
      },
    }),
  ],
  //   - open the debug mode, only in development mode
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
