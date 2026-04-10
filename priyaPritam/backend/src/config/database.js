import mongoose from "mongoose";
async function connectToDb()
{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected to server by shri ji")
    } catch (error) {
        console.error("database is not connected to server by shri ji");
        console.error("message",error.message);
        console.error("stack",error.stack)
        process.exit(1);
    }
}
export default connectToDb