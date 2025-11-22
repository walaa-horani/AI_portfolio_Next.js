"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Send, Loader2 } from "lucide-react";
import { useState,  } from "react";



export function ChatSidebar({ open, onOpenChange }: any) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  const [isLoading, setIsLoading] = useState(false);


 

  const suggestions = [
    "What's your experience?",
    "What skills do you have?",
    "What have you built?",
    "Who are you?",
  ];

  const sendMessage = async()=> {
    if (!input.trim() || isLoading) return;

    const userText = input.trim()
    setInput("")
    setMessages((prev) => [...prev, {role:"user", content:userText}] )
    setIsLoading(true);


    try {
      const res = await fetch("/api/assistant", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),

      })

      const data = await res.json();
      setMessages((prev) => [...prev, {role:"assistant", content:data.reply}] )

    } 
    
    catch (error) {
      setMessages((prev) => [...prev, {role:"assistant", content:"Error connecting to AI."}] )
    }

    setIsLoading(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-6 w-[380px] sm:w-[420px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Chat with AI</SheetTitle>
        </SheetHeader>

        {/* Welcome text - only show if no messages */}
        {messages.length === 0 && (
          <>
            <p className="text-gray-500 text-sm mt-4">
              Hi! I'm your AI assistant. Ask me anything about your work,
              experience, or projects.
            </p>

            {/* Suggestions */}
            <div className="mt-6 space-y-3">
              {suggestions.map((q) => (
                <button
                  key={q}
                  className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-md transition-colors"
                  onClick={() => setInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </>
        )}

         {/* Chat Messages */}

         <div className="flex-1 overflow-y-auto mt-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user" ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
 
      {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <Loader2 className="animate-spin size-4 text-gray-600" />
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="border rounded-md flex items-center p-2 mt-4">
          <input
            className="flex-1 outline-none text-sm bg-transparent"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />


          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="p-2 text-gray-600 hover:text-black disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send size={16} />}
          </button>
         
        </div>
      </SheetContent>
    </Sheet>
  );
}
