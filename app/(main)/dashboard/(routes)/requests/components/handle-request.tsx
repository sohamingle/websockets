"use client"
import { Button } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import { TrashIcon, UserPlus2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const HandleRequest = ({ friend }: { friend: User }) => {
    const [loading,setLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    const handleAdd = () =>{
        try {
            setLoading(true)
            axios.post('/api/handleRequest',{
                friendId: friend.id,
                userId: session.data?.user.userId
            })
            toast.success('Friend Added');
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }finally{
            setLoading(false)
            router.refresh()
        }
    }


    const handeleDelete = () =>{
        try {
            setLoading(true)
            axios.delete(`/api/handleRequest/${session.data?.user.userId}/${friend.id}`)
            toast.success('Friend Request Removed');
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }finally{
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="flex items-center gap-x-3">
            <Button onClick={handleAdd} isIconOnly isLoading={loading} size="sm" color="success">
                <UserPlus2Icon color="white" size={18} />
            </Button>
            <Button onClick={handeleDelete} isLoading={loading} isIconOnly size="sm" color="danger">
                <TrashIcon color="white" size={18} />
            </Button>
        </div>
    );
}

export default HandleRequest;