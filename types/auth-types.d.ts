import type { Session,User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserID = string;

declare module "next-auth/jwt"{
    interface JWT{
        userId: UserID;
    }
}

declare module 'next-auth'{
    interface Session{
        user:User &{
            userId:UserID
        }
    }
}