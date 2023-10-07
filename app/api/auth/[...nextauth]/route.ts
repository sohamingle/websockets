import prisma from "@/utils/prisma-client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user.id; // Use user.sub instead of token.sub
        return {
          ...token,
          userId: u as string
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          userId: token.userId,
          name: token.name,
          email: token.email,
          image: token.picture
        };
      }
      return session;
    }
  }
  
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }