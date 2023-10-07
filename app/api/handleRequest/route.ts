import prisma from "@/utils/prisma-client"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';

export async function POST(req:Request){
    const {friendId,userId} = await req.json()

    if(!friendId ||!userId){
        return new NextResponse("user not found",{status:404})
    }
    const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
    })
    if(!user){
        return new NextResponse("user not found",{status:404})
    }
    const friend = await prisma.user.findFirst({
        where:{
            id:friendId
        }
    })
    if(!friend){
        return new NextResponse("user not found",{status:404})
    }
    const existingFriend = await prisma.friend.findFirst({
        where:{
            userId,
            friendId
        }
    })
    if(existingFriend){
        return new NextResponse("friend already exists",{status:500})
    }
    const channelKey = uuidv4()
    const createUserFriend = await prisma.friend.create({
        data:{
            userId:userId,
            friendId:friendId,
            channelKey:channelKey
        }
    })
    const createFriendFriend = await prisma.friend.create({
        data:{
            userId:friendId,
            friendId:userId,
            channelKey:channelKey
        }
    })

    const deleteRequest = await prisma.friendRequest.delete({
        where:{
            senderId:friendId,
            receiverId:userId
        }
    })
    return NextResponse.json([createUserFriend,createFriendFriend,deleteRequest],{status:201})
} 

