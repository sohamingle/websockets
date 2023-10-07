import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIo } from "@/types/types";

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
            path: path,
            addTrailingSlash:false
        })
        res.socket.server.io = io
    }
    res.end()
}

export default SocketHandler