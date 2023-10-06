import { UserIcon, UserPlusIcon } from "lucide-react";
import NavAvatar from "./utils/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const SideNav = () => {
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
                </div>
            </div>
            <div className="mb-8">
                <NavAvatar />
            </div>
        </nav>
    );
}

export default SideNav;