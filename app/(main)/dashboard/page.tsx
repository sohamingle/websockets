import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {

    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/')
    }

    return (
        <div>
            Enter
        </div>
    );
}

export default DashboardPage;