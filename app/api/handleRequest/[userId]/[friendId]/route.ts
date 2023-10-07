import prisma from "@/utils/prisma-client"
import { NextResponse } from "next/server"

export async function DELETE(req:Request,{params}:{params:{userId:string,friendId:string}}){

    const {userId,friendId} = params

    if(!friendId ||!userId){
        return new NextResponse("user not found",{status:404})
    }
    const deleteRequest = await prisma.friendRequest.delete({
        where:{
            senderId:friendId,
            receiverId:userId
        }
    })
    return NextResponse.json(deleteRequest,{status:200})
}