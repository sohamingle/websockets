"use client"

import { useSocket } from "@/providers/socket-provider";
import { ChatwithUserandFriend } from "@/types/types";
import { Button, Chip, Input, ScrollShadow } from "@nextui-org/react";
import axios from "axios";
import { SendHorizonalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

var socket:any

const Chats = ({ friendId, channelKey }: { friendId: string, channelKey: string }) => {

  const session = useSession()
  // const { socket, isConnected } = useSocket()

  const [chats, setChats] = useState<ChatwithUserandFriend[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
      socket = io('/api/socket/io')
      socket.emit("setup", session.data?.user.userId)
  }, []);

  useEffect(() => {
    socket.on("message received", (newChat: ChatwithUserandFriend) => {
      setChats((prevChats) => [...prevChats, newChat]);
      console.log(newChat);
    });
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chats/${channelKey}`)
        setChats(res.data.reverse());
          socket.emit("join chat", channelKey)
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }
    fetchMessages()
  }, [])

  const handleSend = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/socket/chats', {
        userId: session.data?.user.userId,
        friendId,
        text
      });
  
      console.log('Message sent to server:', data); 
  
      socket.emit("new message", data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    } finally {
      setText('');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex-grow">
        <ScrollShadow hideScrollBar size={0} className=" h-[80vh]">
          <div className="flex justify-center">
            <Chip color="primary">Chat with Friends</Chip>
          </div>
          {chats.reverse().map(ch => (
            <div key={ch.id}>
              {ch.toUserId === session.data?.user.userId ?
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={ch.fromUser.image!} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {ch.fromUser.name}
                  </div>
                  <div className="chat-bubble chat-bubble-accent">{ch.text}</div>
                </div>
                :
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={ch.fromUser.image!} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {ch.fromUser.name}
                  </div>
                  <div className="chat-bubble">{ch.text}</div>
                </div>
              }
            </div>
          ))}
        </ScrollShadow>
      </div>
      <div className="flex gap-5 pb-6">
        <Input
          isClearable
          onValueChange={setText}
          value={text}
          id="text"
          size="lg"
          className="border-black border-medium rounded-xl"
          placeholder="Type your message..."
        />
        <Button isDisabled={loading} size="lg" isIconOnly onClick={handleSend} color="success"><SendHorizonalIcon color="white" /></Button>
      </div>
    </div>
  );
}

export default Chats;