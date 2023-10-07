"use client"

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { SendHorizonalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const InputBar = ({friendId}:{friendId:string}) => {

    const session = useSession()
    const [text, setText] = useState('')
    const [loading , setLoading] = useState(false)
    const handleSend = () => {
        try {
            setLoading(true)
            axios.post('/api/socket/chats',{ 
                userId:session.data?.user.userId, 
                friendId, 
                text
            })
        } catch (error) {
            
        }finally{
            setText('')
            setLoading(false)
        }
    }
    return (
        <div className="flex gap-5 pr-12 pb-6">
            <Input
                isClearable
                onValueChange={setText}
                value={text}
                id="text"
                size="lg"
                className="border-black border-medium rounded-xl"
                placeholder="Type your message..."
            />
            <Button isDisabled={loading} size="lg" isIconOnly onClick={handleSend} color="success"><SendHorizonalIcon color="white"/></Button>
        </div>
    );
}

export default InputBar;