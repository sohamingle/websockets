import prisma from "@/utils/prisma-client";
import SearchProvider from "./components/mount-search";
import { User } from "@nextui-org/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddButton from "./components/add-button";
import { Friend, FriendRequest } from "@prisma/client";
import { Divider } from "@nextui-org/divider";

interface UserType {
        id: string | null;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        friends: Friend[];
        sentFriendRequests: FriendRequest[];
        receivedFriendRequests:FriendRequest[];
}

const AddPage = async ({ searchParams }: { searchParams: { search: string } }) => {

    const session = await getServerSession(authOptions)
    if(!session?.user){
        redirect('/')
    }
    const searchQuery = searchParams.search
    
    const results:UserType[] = searchQuery || searchQuery ==' ' ? await prisma.user.findMany({
        where: {
            name: {
                contains:searchQuery,
                mode:'insensitive'
            },
            id:{
                not:session.user.userId
            }
        },
        take:10,
        include:{
            friends:true,
            sentFriendRequests:true,
            receivedFriendRequests:true,
        }
    }): []

    return (
        <div className="w-[70%] bg-white space-y-9 p-16">
            <p className="font-bold text-5xl mb-9">Add Friends</p>
            <Divider />
            <div className="mt-4">
            <SearchProvider />
            {results.map((result) => (
                <div key={result.id} className="">
                    <div className="flex items-center my-6 gap-8">
                    <User
                        className="space-x-4"
                        name={result.name}
                        avatarProps={{
                            isBordered: true,
                            src: result?.image || '',
                        }}
                    />
                    <AddButton friend={result}/>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default AddPage;