"use client"

import React from "react";
import {Button, User} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export default function NavAvatar() {
  const session = useSession()

  const imageSrc = session.data?.user ? session.data.user.image : ' '

  return (
    <div className="space-x-28 flex items-center px-16">
        <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: session.data?.user?.image! || '',
            }}
            className="transition-transform space-x-4"
            name={session.data?.user?.name}
          />
          <Button isIconOnly onClick={()=>signOut()} ><LogOutIcon/></Button>
          </div>
  );
}
