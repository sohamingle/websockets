import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/prisma-client";
import { Divider } from "@nextui-org/divider";
import { User } from "@nextui-org/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HandleRequest from "./components/handle-request";

const RequestsPage = async () => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        redirect('/')
    }
    const recieved = await prisma.friendRequest.findMany({
        where:{
            receiverId:session.user.userId
        }
    })

    const sent = await prisma.friendRequest.findMany({
        where:{
            senderId:session.user.userId
        }
    })
    const recievedUsers = await prisma.user.findMany({
        where:{
            id:{
                in:recieved.map(item => item.senderId)
            }
        }
    })
    
    const sentUsers = await prisma.user.findMany({
        where:{
            id:{
                in:sent.map(item => item.receiverId)
            }
        }
    })
    return (
        <div className="w-[70%] bg-white space-y-9 p-16">
            <p className="font-bold text-5xl mb-9">Friend Requests</p>
            <Divider/>
            <p className="font-semibold text-xl">Recieved</p>
            {recievedUsers.length !==0 ? recievedUsers.map((result) => (
                <div key={result.id} className="flex gap-8">
                    <User
                        className="space-x-4"
                        name={result.name}
                        avatarProps={{
                            isBordered: true,
                            src: result?.image || '',
                        }}
                    />
                        <HandleRequest friend={result}/>
                </div>
            )): <p>No friend requests recieved</p>}
            <p className="font-semibold text-xl">Sent</p>
            {sentUsers.length !==0 ? sentUsers.map((result) => (
                <div key={result.id}>
                    <User
                        className="space-x-4"
                        name={result.name}
                        avatarProps={{
                            isBordered: true,
                            src: result?.image || '',
                        }}
                    />
                </div>
            )): <p>No friend requests sent</p>}
        </div>
    );
}

export default RequestsPage;