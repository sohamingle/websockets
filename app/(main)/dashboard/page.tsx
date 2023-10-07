import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const DashboardPage = async () => {

    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/')
    }

    return (
        <div className="w-[70%] bg-white p-16 space-y-9">
            <p className="font-bold text-5xl">Recent Chats</p>
            <p>Nothing to see here...</p>
        </div>
    );
}

export default DashboardPage;