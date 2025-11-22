import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const {name, email, subject, message} = await req.json()
    if (!name || !email || !message) {
        return NextResponse.json(
          { error: "Missing required fields." },
          { status: 400 }
        );
      }

       // Create new contact entry in Sanity

       const doc = {
        _type:"contact",
        name,
        email,
        subject: subject || "",
        message,
        submittedAt:new Date().toISOString()

       }

       await client.create(doc)
       return NextResponse.json(
        {success:true, message: "Message submitted successfully!"},
        { status: 200 }


       )
    } catch (error) {
        console.error("Contact form error:", error); 
        
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }

        )
    }

    
}