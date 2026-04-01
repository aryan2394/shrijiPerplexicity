import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./src/config/database.js";
// import { testAi } from "./src/services/ai.service.js";
// testAi()
connectToDb()
app.listen(3000,()=>
{
    console.log("server is connected by shri ji")
})