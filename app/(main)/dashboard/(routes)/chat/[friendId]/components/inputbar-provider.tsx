"use client"

import { useEffect, useState } from "react";
import InputBar from "./input-bar";

const InputbarProvider = ({friendId}:{friendId:string}) => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
        <div>
            <InputBar friendId={friendId}/>
        </div>
    );
}

export default InputbarProvider;