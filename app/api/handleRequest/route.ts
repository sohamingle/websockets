import prisma from "@/utils/prisma-client"
import { NextResponse } from "next/server"

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
    const createUserFriend = await prisma.friend.create({
        data:{
            userId:userId,
            friendId:friendId
        }
    })
    const createFriendFriend = await prisma.friend.create({
        data:{
            userId:friendId,
            friendId:userId
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

