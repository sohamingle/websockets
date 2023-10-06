"use client"

import { useEffect, useState } from "react";
import SearchBar from "./search-bar";

const SearchProvider = () => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
        <SearchBar/>
    );
}

export default SearchProvider;