import { io } from "socket.io-client";
export const initSocketConnection=()=>
{
    const socket=io("http://localhost:3000",{
        withCredentials:true
    })
    socket.on("connect",()=>
    {
        console.log("user is connected to socket.io by shri ji")
    })
}