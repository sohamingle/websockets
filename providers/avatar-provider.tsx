"use client"

import NavAvatar from "@/components/utils/avatar";
import { useEffect, useState } from "react";

const AvatarProvider = () => {

    const [isMounted , setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    return (
        <NavAvatar/>
    );
}

export default AvatarProvider;