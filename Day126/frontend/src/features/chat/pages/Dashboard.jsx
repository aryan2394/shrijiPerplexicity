import React, { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // 🧠 Dummy chat list
  const [chats, setChats] = useState([
    { id: 1, title: "React Help" },
    { id: 2, title: "Node Backend" },
    { id: 3, title: "AI Project" },
  ]);

  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! Ask me anything 🚀" },
  ]);

  const [input, setInput] = useState("");

  // 🎯 Dummy AI responses
  const fakeReplies = [
    "That's a great question!",
    "Let me explain that simply.",
    "Here’s what you need to know.",
    "This works like this...",
    "Interesting, let’s break it down."
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const randomReply =
      fakeReplies[Math.floor(Math.random() * fakeReplies.length)];

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: randomReply },
    ]);

    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white">

      {/* Sidebar */}
      <div className="w-72 bg-[#121212] border-r border-gray-800 p-4 flex flex-col">
        <h1 className="text-xl font-semibold mb-6">
          {user?.name || "User"}
        </h1>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer"
            >
              {chat.title}
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            setChats((prev) => [
              ...prev,
              { id: Date.now(), title: "New Chat" },
            ])
          }
          className="mt-4 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
        >
          + New Chat
        </button>
      </div>

      {/* Main Chat */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="p-4 border-b border-gray-800 text-gray-400">
          Ask anything...
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-[#1e1e1e]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex bg-[#1a1a1a] rounded-xl px-3 py-2">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 bg-transparent outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;