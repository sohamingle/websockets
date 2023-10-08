import { ChatwithUserandFriend, NextApiRequestServerIo, NextApiResponseServerIo } from "@/types/types";
import prisma from "@/utils/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req:NextApiRequestServerIo,{params:{channelKey}}:{params:{channelKey:string}}){
    if(!channelKey){
        return new NextResponse("Invalid",{status:500})
    }
    const relation = await prisma.friend.findFirst({
        where:{
            channelKey:channelKey
        }
    })
    if(!relation){
        return new NextResponse("Invalid",{status:404})
    }
    const chats:ChatwithUserandFriend[] = await prisma.chat.findMany({
        take:10,
        where:{
            channelKey
        },
        include:{
            fromUser:true,
            friendUser:true
        },
        orderBy:{
            createdAt: "desc"
        } 
    })

    
    
    return NextResponse.json(chats,{status:200})
}