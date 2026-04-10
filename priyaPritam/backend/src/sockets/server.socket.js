import {Server} from "socket.io"
let io;
export async function initSocket(httpServer)
{
    io=new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })
    console.log("socket.io is also connected to backend http server by shri ji");
    io.on("connection",(socket)=>
    {
        console.log("user is connected to socket.io by shri ji "+socket.id);
    })
}
export async function getIO()
{
    if(!io)
    {
        throw new Error("socket.io is not initialized by shri ji")
    }
    return io;
}
