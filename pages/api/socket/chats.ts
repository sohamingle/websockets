import { NextApiResponseServerIo } from '@/types/types';
import prisma from '@/utils/prisma-client';
import { NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Invalid" })
    }
    try {
        const { userId, friendId, text } = await req.body
        if (!userId || !friendId || !text) {
            return res.status(400).json({ error: "Invalid" })
        }
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        const friend = await prisma.user.findFirst({
            where: {
                id: friendId
            }
        })
        if (!user || !friend) {
            return res.status(400).json({ error: "Invalid" })
        }
        const relation = await prisma.friend.findFirst({
            where: {
                userId: userId,
                friendId: friendId
            }
        })
        if (relation) {
        const channelKey = relation.channelKey
        const chatFromUser = await prisma.chat.create({
            data: {
                fromUserId: userId,
                toUserId: friendId,
                text: text,
                channelKey: channelKey
            }
        })

        res?.socket?.server?.io?.emit(channelKey,text)
        return res.status(200).json(text)
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" })
    }
}