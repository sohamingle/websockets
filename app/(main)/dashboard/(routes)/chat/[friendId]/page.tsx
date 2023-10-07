import prisma from "@/utils/prisma-client";
import Chats from "./components/chats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import InputbarProvider from "./components/inputbar-provider";

const ChatPage = async ({params:{friendId}}:{params:{friendId:string}}) => {
    const session = await getServerSession(authOptions)
    const relation = await prisma.friend.findUnique({
        where:{
            userId:session?.user.userId,
            friendId:friendId
        }
    })
    return (
        <div className=" w-[70%] flex flex-col p-5">
            <div className="flex-grow">
                {relation &&
                <Chats channelKey={relation.channelKey}/>}
            </div>
            <div className="">
                <InputbarProvider friendId={friendId}/>
            </div>
        </div>
    );
}

export default ChatPage;