"use client";

import React from "react";
import { ChatButton } from "./ChatButton";
import ChatOpenAI from "./ChatSidebarOpenAI";
import { useUser } from "@clerk/nextjs";

export function ChatUIWrapper() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <>
      <ChatOpenAI
        open={open}
        onOpenChange={setOpen}
        profile={null}
      />
      <ChatButton onClick={() => setOpen(true)} />
    </>
  );
}
