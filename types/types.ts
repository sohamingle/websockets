import { User } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse &{
    socket:Socket &{
        server:NetServer & {
            io:SocketIOServer
        }
    }
}

export type ChatwithUserandFriend = {
    id:string
    fromUserId: string;
    toUserId: string;
    text: string;
    channelKey: string;
    fromUser:User;
    friendUser:User;
}