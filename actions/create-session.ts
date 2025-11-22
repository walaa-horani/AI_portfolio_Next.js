"use server";

import { auth } from "@clerk/nextjs/server";
import { WORKFLOW_ID } from "@/lib/config";

export async function createSession() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized - Please sign in");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  if (!WORKFLOW_ID) {
    throw new Error("WORKFLOW_ID not configured");
  }

  // Create ChatKit session with Clerk user ID
  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "OpenAI-Beta": "chatkit_beta=v1",
    },
    body: JSON.stringify({
      workflow: { id: WORKFLOW_ID },
      user: userId,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create session: ${error}`);
  }

  const data = await response.json();
  return data.client_secret as string;
}