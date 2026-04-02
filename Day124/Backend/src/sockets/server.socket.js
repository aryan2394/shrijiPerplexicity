import { Server } from "socket.io";
let io;
export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })
    console.log("socket.io server is connected by backend server httpServer by shri ji")
    io.on("connection", (socket) => {
        console.log("user is connected by shri ji with server of socket.io" + socket.id)
    })
}
export function getIO() {
    if (!io) {
        throw new Error("socket.io is not initialized by shri ji")
    }
    return io;
}