// import {Server} from "socket.io"
// let io;
// export function initSocket(httpServer)
// {
//     io=new Server(httpServer,{
//         cors:{
//             origin:"http://localhost:5173",
//             credentials:true
//         }
//     })
//     console.log("socket.io server is running")
//     io.on("connection",(socket)=>
//     {
//         console.log("user connected by shri ji"+socket.id)
//     })
// }
// export function getIo()
// {
//     if(!io)
//     {
//         throw new Error("socket.io is not initialized")
//     }
//     return io;
// }

import { Server} from "socket.io";
let io;
export function initSocket(httpServer)
{
    io=new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })
    console.log("server is connected to socket.io by shri ji")
    io.on("connection",(socket)=>
    {
        console.log("user is connected by shri ji"+socket.id)
    })
}
export function getIo()
{
    if(!io)
    {
        throw new Error("socket.io is not initialized by shri ji")
    }
    return io;
}