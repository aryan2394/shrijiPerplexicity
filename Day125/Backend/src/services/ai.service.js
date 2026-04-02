import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage,SystemMessage} from "langchain"
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
//   for api key go to google ststudio and get the api key from the project cihart-perplexicity
});
const mistralModel=new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY
})
export async function testAi()
{
    model.invoke("Who is radha rani in hinglish language mein  less than 20 wrrds than give her unki khasiyat")
    .then((response)=>
    {
        console.log(response.text);
    })
}

// ye function hai jo tak call hoga jab user koi ai se cheez puchna chahe
export async function generateResponse(message)
{
    // ye message ya query aayi hai user se 
    const response=await geminiModel.invoke([
        new HumanMessage(message)
    ])
    return response.text;
}

// ye function jo hai title genearete karta hai on the given message provided
// and humein jab bhi batana hoga ki instruction dena ho then we will use the {SYSTEMMESSAGE } to give the instructions to the AI Ki aise geneatere karna ahai message 

export async function generateChatTitle(message) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`
You are a helpful assistant that generates concise and descriptive titles for chat conversations.

User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging.
      `),
      new HumanMessage(`
Generate a title for a chat conversation based on the following first message:
"${message}"
      `)
    ]);

    // Extract and return the generated title
    return response.content.trim();
  } catch (error) {
    console.error("Error generating chat title:", error);
    return "New Chat";
  }
}