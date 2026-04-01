import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
//   for api key go to google ststudio and get the api key from the project cihart-perplexicity
});
export async function testAi()
{
    model.invoke("Who is radha rani in hinglish language mein  less than 20 wrrds than give her unki khasiyat")
    .then((response)=>
    {
        console.log(response.text);
    })
}