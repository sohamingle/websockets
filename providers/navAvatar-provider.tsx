"use client"

import NavAvatar from "@/components/utils/avatar";
import { useEffect, useState } from "react";

const NavAvatarProvider = () => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
        <div>
            <NavAvatar/>
        </div>
    );
}

export default NavAvatarProvider;