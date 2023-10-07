"use client"

import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SearchBar = () => {

  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams, query]
  )

  const changeUrl = (newQuery:string) =>{
    router.replace(pathname + '?' + createQueryString('search', newQuery));
  }

  useEffect(()=>{
    changeUrl(query)
  },[query])

  return (
    <label className="space-y-2" htmlFor="search">
      <p>Search</p>
      <Input
        isClearable
        onValueChange={setQuery}
        value={query}
        id="search"
        size="lg"
        className="border-black border-medium rounded-xl"
        placeholder="Type to search..."
        startContent={<SearchIcon size={'1.5rem'} />}
      />
    </label>
  );
}

export default SearchBar;