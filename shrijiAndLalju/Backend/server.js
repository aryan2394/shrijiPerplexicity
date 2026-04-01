import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./src/config/database.js";
import { testAi } from "./src/services/ai.service.js";
import { initSocket } from "./src/sockets/server.socket.js";
import http from "http"
const httpServer=http.createServer(app);
initSocket(httpServer)
connectToDb()
httpServer.listen(3000,()=>
{
    console.log("server is connected by shri ji")
})