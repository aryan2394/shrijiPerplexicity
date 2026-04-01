import "dotenv/config"
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import {createAgent, HumanMessage,tool} from "langchain"
import { sendEmail } from "./email.service.js";
import * as z from "zod"
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
const rl = readline.createInterface({ input, output });
const model=new ChatMistralAI({
    model:"mistral-small-latest"
})

// ye sab kuch karke de dega lekin ek cheez nahi kar sakta aur wo koi action perform karna like abhi hum agar chahe ki humara ai kisi bhi given mail pe email send karde not possible 
// uske liye humein usse ower deni hogi taaki ai koi action perform kar sakein so rEAAD THE TOOLSAGENT.TXT for more information

// toh humein ek tool bananna hpga matlab ki ek aisa function normally jo email ko send kar sakein 
// tools kuch nahi ek function hote hai jo ki koi action ko perfrom karte hai and tools mein hum properly kya action perfrom karwana haia nd kaise karwana hai sab bataatte hai 

const emailTool=new tool(
    sendEmail,
    // ab jo ye function jo hai main wo kuch n kuch string return karna chhiye therefore go to sendEmail and return some string
    {
        name:"shrijiEmailTool",
        description:"shri ji email tool",
        // ab owo function kya paaramerers lega 
        schema:z.object({
            to:z.string().describe("shri ji kisko mail kar rahai hai"),
            subject:z.string().describe("shri ji subject mein kya likhagei"),
            html:z.string().describe("shri ji ka html kya hai")
        })
    }
)

const tavityTool=new TavilySearchResults({
    api_key:process.env.TAVILY_API_KEY
})
// ab tool ban gaya hai and ab humein ek agent banana hai 
// agent ky hota hai :ye humare llm models ko batata hai ki jo tumne tools(callable functions banaye hai wo kab and kaise use karna hai)

const agent=createAgent({
    model,
    tools:[emailTool]
    // dekho agent hi sab kaam karega dekho overall samjho kya hoga and kaise flow hoga 
    // AGENT IS SHRIJI(SABSE MAIN) HERE 
    // DO TYPES ke actions ho sakte hai and wo hai first one is normally ai se data generate karwana and second is kuch action perform karwana hai
    // sabse pahle query model ke paas jaata hai 
    // phur noraml hai conteny hai then wo process output kar deta 
    // agar koi action perform karwana hai toh wo model 
        //             +--------+
        //         | INPUT  |
        //         +--------+
        //              |
        //              v
        //         +--------+
        //         | MODEL  |
        //         +--------+
        //          /   |   \
        //         /    |    \
        //        v     v     v
        //   +--------+ |  +--------+
        //   | ACTION | |  | FINISH |
        //   +--------+ |  +--------+
        //        |     |       |
        //        v     |       v
        //   +--------+ |   +--------+
        //   | TOOLS  | |   | OUTPUT |
        //   +--------+ |   +--------+
        //        |     |
        //        v     |
        //   +-------------+
        //   | OBSERVATION |
        //   +-------------+
        //        |
        //        +----------> (goes back to MODEL)

        // ek sabse important ye hai ki 

})
// ab agent banane ke baad ab aap apne model se invote question ke hisab se nahi balki agent ke hisab se karoge invote taaki wo sirf content generate hi n karein balaki kuch action bhi kar sakein
// and agar aap chahte hai ki ka actin humara agaent perform karr paaye then give the tool description otherwise a agent cannot do the work


// TAVLY :Matlab data abhi fetch ho raha hai lekin old new nahi 


let shriji=[]

while (true) {
    const question = await rl.question("You: ");

    shriji.push(new HumanMessage(question));

    const response = await agent.invoke({
        messages: shriji
    });

    // pura object push mat karo ❌
    const aiMessage = response.messages.at(-1);

    shriji.push(aiMessage);

    console.log("AI:", aiMessage.content);
}
// Yeh line kya kar rahi hai?
// const aiMessage = response.messages.at(-1);
// 📦 Step by step samjho:
// 1. response kya hai?

// Jab tum agent ko call karte ho:

// const response = await agent.invoke({
//     messages: shriji
// });

// Toh response kuch aisa hota hai:

// {
//   messages: [
//     HumanMessage("hi"),
//     AIMessage("hello"),
//     HumanMessage("kaise ho"),
//     AIMessage("main thik hoon")
//   ]
// }
// 2. response.messages kya hai?

// 👉 Yeh poora chat history array hai

// response.messages
// 3. .at(-1) kya karta hai?

// 👉 JavaScript ka shortcut hai last element nikalne ka

// array.at(-1)

// Same as:

// array[array.length - 1]
// 🔥 Example
// const arr = [1, 2, 3, 4];

// console.log(arr.at(-1)); // 4
// 4. Toh final meaning:
// const aiMessage = response.messages.at(-1);

// 👉 Matlab:

// "Mujhe last message de do (jo AI ne abhi reply diya hai)"