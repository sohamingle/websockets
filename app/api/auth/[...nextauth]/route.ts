import prisma from "@/utils/prisma-client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions:NextAuthOptions = {
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    adapter:PrismaAdapter(prisma),
    session:{
        strategy:'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
          try {
            const dbUser = await prisma.user.findFirst({
              where: {
                id: token.id
              }
            });
      
            if (!dbUser) {
              token.id = user.id;
              return token;
            }
      
            return {
              id: dbUser.id,
              name: dbUser.name || null,
              email: dbUser.email || null,
              image: dbUser.image || null
            };
          } catch (error) {
            console.error('Error while fetching user from the database:', error);
            throw new Error('Error while authenticating user');
          }
        },
        async session({ session, token }) {
          if (token) {
            session.user = {
              id: token.id as string,
              name: token.name as string | null,
              email: token.email as string | null,
              image: token.image as string | null
            };
          }
          return session;
        }
      }
      
}


const handler = NextAuth(authOptions)
  
export { handler as GET, handler as POST }