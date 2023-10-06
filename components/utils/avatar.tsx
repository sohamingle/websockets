"use client"

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavAvatar() {
    const session = useSession()     
    
  return (
    session.data?.user ?
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={session.data?.user?.image || ''}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem>{session.data.user.name}</DropdownItem>
          <DropdownItem onClick={()=>signOut()} color="danger" >Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    : <Button onClick={()=>signIn()} color="primary" variant="ghost">Login</Button>
  );
}
