import prisma from "@/utils/prisma-client";
import Chats from "./components/chats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import InputbarProvider from "./components/inputbar-provider";

const ChatPage = async ({ params: { friendId } }: { params: { friendId: string } }) => {
    const session = await getServerSession(authOptions)
    const relation = await prisma.friend.findUnique({
        where: {
            userId: session?.user.userId,
            friendId: friendId
        }
    })

    if (!relation) {
        return null
    }

    return (
        <div className=" w-[70%] flex flex-col pr-12 p-5">
            <InputbarProvider friendId={friendId} channelKey={relation.channelKey} />
        </div>
    );
}

export default ChatPage;