"use client"

import { useEffect, useState } from "react";
import Chats from "./chats";

const InputbarProvider = ({friendId,channelKey}:{friendId:string,channelKey:string}) => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
        <div>
            <Chats friendId={friendId} channelKey={channelKey}/>
        </div>
    );
}

export default InputbarProvider;