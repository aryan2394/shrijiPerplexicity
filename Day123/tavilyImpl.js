import "dotenv/config"
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import {createAgent, HumanMessage,tool} from "langchain"
import { sendEmail } from "./email.service.js";
import * as z from "zod"
import { TavilySearchResults } from "@langchain/community/tools/tavily_search_results";
const rl = readline.createInterface({ input, output });
const model=new ChatMistralAI({
    model:"mistral-small-latest"
})

const emailTool=new tool(
    sendEmail,
    {
        name:"shrijiEmailTool",
        description:"shri ji email tool",
        schema:z.object({
            to:z.string().describe("shri ji kisko mail kar rahai hai"),
            subject:z.string().describe("shri ji subject mein kya likhagei"),
            html:z.string().describe("shri ji ka html kya hai")
        })
    }
)

const tavilyTool=new TavilySearchResults({
    apiKey:process.env.TAVILY_API_KEY
})

const agent = createAgent({
    model,
    tools: [emailTool, tavilyTool],

    systemPrompt: `
You are an intelligent AI assistant.

You MUST follow these rules:

1. EMAIL ACTION:
- If the user asks to send an email, ALWAYS use the email tool.
- Do NOT generate fake responses.

2. REAL-TIME / CURRENT INFO:
- If the question involves latest information, current events, news, weather, or anything time-sensitive → ALWAYS use Tavily search tool first.
- After getting results, summarize and answer clearly.

3. GENERAL KNOWLEDGE:
- If the question is basic knowledge (math, definitions, coding, concepts) → answer directly using your own knowledge.
- Do NOT use Tavily unnecessarily.

4. DECISION MAKING:
- Think before answering:
    → "Do I need a tool?"
    → If yes → use correct tool
    → If no → answer directly

5. NEVER GUESS current facts.
Always prefer accuracy over speed.
`
});

let shriji=[]

while (true) {
    const question = await rl.question("You: ");

    shriji.push(new HumanMessage(question));

    const response = await agent.invoke({
        messages: shriji
    });

    const aiMessage = response.messages.at(-1);

    shriji.push(aiMessage);

    console.log("AI:", aiMessage.content);
}
