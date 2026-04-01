// import readline from "readline";

// // go to ai and usse boliye ki set up the js for taking input 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Enter your name: ", (name) => {
//     // ye ek question puchega terminal mein and jo bhi user input dega wo name wale callback mein jayega and hum usko uss kar sakte hai
//   console.log("Hello " + name);
// //   rl.close taaki wo input ke baad server band ho jaaye
//   rl.close();
// });



// ab humein download karna hoga langachain (ye kisi bhi ai service provider se baat karne mein help karta hai )
// ab ye toh saare ai service provider se baat kar sakta hai lkein aapko jo model uss karna hai usko bhi dwnload karein

// LIKE GEMININ KE LIYE NPM I LANGCHAIN GEMINILANgchain

// we are using the mistralAi toh go to langchain and usmein integrations mein chat mdels usmein mistraLAI 

import "dotenv/config"
import readline from "readline/promises";
import {ChatMistralAI} from "@langchain/mistralai"
import { HumanMessage, AIMessage } from "@langchain/core/messages";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const model=new ChatMistralAI({
    model:"mistral-small-latest"
})
// const response=await model.invoke("radha rani in less than 20 words")
// console.log(response.text);
// rl.close();
// bahar iss liye lagaya hai taaki wo har input pe baar close ho jaaye 

// ab hum chahte hai ki ki user contaunuesly terminal mein question puche  and ai usko jawab dete rahe OK OK 

// continuesly chle toh use the condition :while(true)

// har baar input de user and phir jo bhi input de usko hum ai mein fee kar denge phir wo ai output dega and these process continues 

// while(true)
// {
//     const question=await rl.question("You:")
//     // ab ko bhi question puchega user wo question variable mein save hoga and hum usko ai ko de denge 
//     const response=await model.invoke(question);
//     console.log(response.text);
// }
// rl.close();

// VERY IMPOTATNT!
// maine do teen question uss model se pucha then phr mein question puchta hoon ki what is the frist message i have given you he answered mein nahi jaanta hoon ki lekin ai toh humara purane data se hi tarined hota haia 

// “AI toh trained hota hai past data pe, phir usse mera pehla question kyun yaad nahi?”

// ✅ Short Answer:

// 👉 Model trained hota hai general data pe (internet/books)
// 👉 BUT tumhari current chat yaad nahi rakhta by default

// matlab jab wo ek cycle complete karata haia then wahi uska pahla and last question rahata hai 

// Har baar tum sirf ek question bhej rahe ho

// So AI ko lagta hai:

// “Ye mera first message hai”
// Isliye wo previous kuch yaad nahi rakhta
// 💡 Solution → Chat History (Memory) add karo

// Tumhe har message store karke AI ko bhejna padega 👇
let shrijiMessages=[]
while(true)
{
    const question=await rl.question("You:");
    shrijiMessages.push(new HumanMessage(question));
    const response=await model.invoke(shrijiMessages);
    shrijiMessages.push(new AIMessage(response.content));
    console.log(response.content);
}

// You:radha rani in less than 20 words
// Radha is Krishna's beloved consort, symbolizing divine love and devotion in Hindu mythology.
// You:more about shriji kindness in hinglish 
// **Shriji ki daya (kindness) ka pyaar bhara bharpoor hai!**

// Krishna ki daya anant hai—bhakton ke dukh-dard ko khud par uthakar, unhe mohobbat aur shakti deti hai. Wo apne bhakton ke liye **sarvadhan** hain—jo bhi unse ek baar bhi prayaas kare, usey **mukti ya shanti** milti hai.

// Unki daya ka sabse bada udaharan hai **Radha-Rani**—jo apne prem se poore braj ko prem se bhar deti hain. Krishna ke liye Radha ka prem **sarvottam daya ka roop** hai.

// Shriji ke daya ke bina, bhakti adhoori hai. **"Prem se hi milta hai unse—daya, shakti, aur shanti!"** 🙏💙
// You:mera pahle message kya tha 
// Aapka pehla message yeh tha:

// **"radha rani in less than 20 words"**
// You:
rl.close();