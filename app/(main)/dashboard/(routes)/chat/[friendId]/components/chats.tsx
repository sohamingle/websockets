"use client"

import { useSocket } from "@/providers/socket-provider";
import { ChatwithUserandFriend } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Chats = ({channelKey}:{channelKey:string}) => {
    const [chats,setChats] = useState<ChatwithUserandFriend[]>([])
    const {socket} = useSocket()
    useEffect(() => {
        if (!socket) {
          return;
        }
    
        const handleSocketEvent = (data: ChatwithUserandFriend) => {
          setChats(prevChats => [...prevChats, data]);
          console.log(chats)
        };
    
        socket.on(channelKey, handleSocketEvent);
    
        return () => {
          socket.off(channelKey, handleSocketEvent);
        };
      }, [socket]);
    return (
        <div>
            
        </div>
    );
}

export default Chats;