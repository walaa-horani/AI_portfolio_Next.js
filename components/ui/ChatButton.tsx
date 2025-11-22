"use client";

import { MessageCircle } from "lucide-react";

export function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50 
        bg-black text-white 
        p-4 rounded-full shadow-lg 
        hover:bg-gray-800 transition
      "
    >
      <MessageCircle size={24} />
    </button>
  );
}
