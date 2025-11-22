"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import type { HERO_QUERYResult } from "@/sanity.types";
import { createSession } from "@/actions/create-session";
import { useUser } from "@clerk/nextjs";

export function ChatOpenAI({
  profile,
  open,
  onOpenChange,
}: {
  profile: HERO_QUERYResult | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { user } = useUser();
  console.log("CURRENT USER:", user?.fullName);

  // greeting
  const getGreeting = () => {
    if (!profile?.firstName) {
      return "Hi there! Ask me anything about my work, experience, or projects.";
    }
    
    const fullName = [profile.firstName, profile.lastName]
      .filter(Boolean)
      .join(" ");

    return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
  };

  const { control } = useChatKit({
    api: {
      getClientSecret: async (_existingSecret) => {
        // Called on initial load and when session needs refresh, we dont actuall use the existing secret as userId is managed by Clerk
        return createSession();
      },
    },

    header: {
      title: { text: `Chat with ${profile?.firstName || "Me"}` },
      leftAction: {
        icon: "close",
        onClick: () => onOpenChange(false),
      },
    },

    startScreen: {
      greeting: getGreeting(),
      prompts: [
        {
          icon: "suitcase",
          label: "What's your experience?",
          prompt: "Tell me about your professional experience and previous roles",
        },
      ],
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[380px] sm:w-[420px] h-full bg-white shadow-xl">
        <ChatKit control={control} className="h-full w-full" />
      </div>
    </div>
  );
}

export default ChatOpenAI;
