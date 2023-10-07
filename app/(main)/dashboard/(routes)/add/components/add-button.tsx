"use client"

import { Button,Tooltip } from "@nextui-org/react";
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
                senderId: session.data?.user.userId as string,
                receiverId: friend.id as string,
            })
        } catch (error) {
            console.log(error)
        }finally{
            setDisabled(false)
        }
    }

    const alreadyAdded = friend.friends.find(item => item.friendId === session.data?.user.userId)
    
    const alreadySent = friend.receivedFriendRequests.find(item => item.senderId === session.data?.user.userId)

    const alreadyReceived = friend.sentFriendRequests.find(item => item.receiverId === session.data?.user.userId)

    let tooltipContext =''
    if(alreadyAdded){
        tooltipContext = 'already added'
    }else if(alreadyReceived){
        tooltipContext = 'already received'
    }else if(alreadySent){
        tooltipContext = 'already sent'
    }

    return (
        <>
        {
            alreadyAdded || alreadyReceived || alreadySent ? (
              <Tooltip content={tooltipContext}>
                <Button className="cursor-not-allowed" isIconOnly>
                  <UserPlus2Icon size={20} />
                </Button>
              </Tooltip>
            ) : (
              <Button isIconOnly isDisabled={disabled} color="primary" onClick={handleClick}>
                <UserPlus2Icon size={20} />
              </Button>
            )
          }
          </>
    );
}

export default AddButton;