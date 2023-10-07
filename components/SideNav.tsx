import { UserIcon, UserPlusIcon } from "lucide-react";
import NavAvatar from "./utils/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/prisma-client";
import { User } from "@nextui-org/user";

const SideNav = async () => {
    const session = await getServerSession(authOptions)
    const friendIds = await prisma.friend.findMany({
        where: {
            userId: session?.user.userId
        }
    })

    const friends = await prisma.user.findMany({
        where: {
            id: {
                in: friendIds.map((friend) => friend.friendId)
            }
        }
    })

    return (
        <nav className="flex flex-col border-small border-slate-950">
            <div className="flex-grow space-y-8 p-8">
                <Button as={Link} href="/dashboard/add" variant="bordered" className="flex w-full items-center gap-5">
                    <UserPlusIcon />
                    <p className="font-bold text-2xl">Add Friends</p>
                </Button>
                <Button as={Link} href="/dashboard/requests" variant="bordered" className="flex items-center w-full gap-5">
                    <UserIcon />
                    <p className="font-bold text-2xl">Friend Requests</p>
                </Button>
                <div>
                    <p>Chats</p>
                    {friends.map(friend => (
                        <div key={friend.id}>
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    src:friend.image || '',
                                }}
                                className="transition-transform my-4 space-x-4"
                                name={friend.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-8">
                <NavAvatar />
            </div>
        </nav>
    );
}

export default SideNav;