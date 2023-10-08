import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { Server as NetServer } from "http";
import { ChatwithUserandFriend, NextApiResponseServerIo } from "@/types/types";

export const config = {
    api: {
        bodyParser: false
    }
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIo)=>{
    if(res.socket.server.io){
        console.log("Socket Server I/O is available")
    } else{
        console.log("Socket Server I/O is initializing")
        const path = '/api/socket/io'
        const httpServer:NetServer = res.socket.server as any
        const io = new ServerIO(httpServer,{
            pingTimeout:60000,
            path: path,
            addTrailingSlash:false
        })
        res.socket.server.io = io
        io.on('connection',(socket:Socket)=>{
            console.log("Connection established")
            socket.on("setup",(userId:string)=>{
                socket.join(userId)
                socket.emit("connected")
                console.log('user: ',userId)
            })

            socket.on("join chat",(channelKey:string)=>{
                socket.join(channelKey)
                console.log("user joined chat",channelKey)
            })
            socket.on("new message",(newMessage:ChatwithUserandFriend)=>{
                if(!newMessage) return null
                const newChat = newMessage
                console.log(newChat)
                socket.in(newChat.channelKey).emit("message received", newChat);
            })
        })
    }
    res.end()
}

export default SocketHandler