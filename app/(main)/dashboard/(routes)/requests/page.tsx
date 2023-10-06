import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RequestsPage = async () => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        redirect('/')
    }
    const requests = await prisma.friendRequest.findMany({
        where:{
            receiverId:session.user.id
        }
    })

    return (
        <div className="w-[70%] bg-white space-y-9 p-16">
            <p className="font-bold text-5xl mb-9">Friend Requests</p>
            {requests.map(req => (
                <div key={req.id}>
                    {req.senderId}
                </div>
            ))}
        </div>
    );
}

export default RequestsPage;