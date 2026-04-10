import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage,SystemMessage,AIMessage} from "langchain"
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});
const mistralModel=new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY
})
export async function generateResponse(messages)
{
  // hum kya kar rahe hai ki jo bhi messages aaye hai wo array of messages aaya hai because humne purane saare chat and new human message saare ko feed 
  // kiya hai ai ko  taaki kabhi user purane chat ko bhi resume kar sakein and usmein continue kar sakein 
   const response = await geminiModel.invoke(
        messages.map((msg) => {
            if (msg.role == "user") {
                return new HumanMessage(msg.content);
            } else if (msg.role == "ai") {
                return new AIMessage(msg.content);
            }
        })
    );

    return response.text;
}
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