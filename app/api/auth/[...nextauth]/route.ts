import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions:NextAuthOptions = {
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
}


const handler = NextAuth(authOptions)
  
export { handler as GET, handler as POST }