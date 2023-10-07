"use client"
import { Button } from "@nextui-org/react";
import { User } from "@prisma/client";
import { TrashIcon, UserPlus2Icon } from "lucide-react";

const HandleRequest = ({ friend }: { friend: User }) => {
    
    return (
        <div className="flex items-center gap-x-3">
            <Button isIconOnly size="sm" color="success">
                <UserPlus2Icon color="white" size={18} />
            </Button>
            <Button isIconOnly size="sm" color="danger">
                <TrashIcon color="white" size={18} />
            </Button>
        </div>
    );
}

export default HandleRequest;