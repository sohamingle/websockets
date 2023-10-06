"use client"

import { Button } from "@nextui-org/react";
import { Friend, FriendRequest } from "@prisma/client";
import axios from "axios";
import { UserPlus2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface FriendProps {
    friend: {
        id: string | null;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        friends: Friend[];
        sentFriendRequests: FriendRequest[];
        receivedFriendRequests:FriendRequest[];
    }
}

const AddButton: React.FC<FriendProps> = ({ friend }) => {

    const [disabled,setDisabled] = useState(false)
    const session = useSession()

    const handleClick = () => {
        try {
            setDisabled(true)
            axios.post('/api/add',{
                senderId: session.data?.user.id as string,
                receiverId: friend.id as string,
            })
        } catch (error) {
            console.log(error)
        }finally{
            setDisabled(false)
        }
    }

    if(session.data && (session.data.user.id in (friend.friends || friend.receivedFriendRequests || friend.receivedFriendRequests))){
        setDisabled(true)
    }

    if(friend.id )

    return (
        <Button isIconOnly isDisabled={disabled} onClick={handleClick}><UserPlus2Icon size={20} /></Button>
    );
}

export default AddButton;