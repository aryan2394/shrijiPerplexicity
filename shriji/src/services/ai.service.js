import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});
export async function testAi()
{
    model.invoke("what is the advantage of following radha rani in hinglish")
    .then((response)=>console.log(response.text))
    .catch((err)=>console.log("error while running ai",err))
}