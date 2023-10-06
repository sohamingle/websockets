import prisma from "@/utils/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {senderId , receiverId } = await req.json();
    const user = await prisma.user.findFirst({
        where:{
            id:senderId
        }
    })
    if(!user){
        return new NextResponse("user not found",{status:404})
    }
    if(!senderId || !receiverId){
        return new NextResponse("user not found",{status:404})
    }
    const existingRequest = await prisma.friendRequest.findFirst({
        where:{
            senderId,
            receiverId
        }
    })
    if(existingRequest){
        return new NextResponse("request already sent",{status:404})
    }
    const friendRequest = await prisma.friendRequest.create({
        //@ts-ignore
        data:{
            senderId,
            receiverId,
            status:"pending",
        }
    })
    return NextResponse.json(friendRequest,{status:201})
}