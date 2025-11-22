"use client"
import React, { useState } from 'react'

export default function ContactSection() {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setLoading(true);
        setSuccess("");
        setError("");

        const form = e.currentTarget
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())


        try {
            const res = await fetch("/api/contact",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
               body : JSON.stringify(data)  

            })

            const result = await res.json()

            if(!res.ok){
            setError(result.error || "Something went wrong.");

            }else{
            setSuccess("Your message has been sent successfully!");

            form.reset();

            }
        } catch (error) {
           setError("Network error. Please try again."); 
        }finally {
            setLoading(false);
          }

        
      
    }
  return (
    <section className='py-20 px-6 container mx-auto max-w-3xl'>
        
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>

<form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    className="w-full p-3 border rounded-lg bg-background"
  />

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    className="w-full p-3 border rounded-lg bg-background"
  />

  <input
    type="text"
    name="subject"
    placeholder="Subject (optional)"
    className="w-full p-3 border rounded-lg bg-background"
  />

  <textarea
    name="message"
    rows={5}
    required
    placeholder="Your Message"
    className="w-full p-3 border rounded-lg bg-background"
  ></textarea>

  <button
    type="submit"
    disabled={loading}
    className="w-full p-3 bg-primary text-white rounded-lg font-medium"
  >
    {loading ? "Sending..." : "Send Message"}
  </button>

  {success && <p className="text-green-600 text-center">{success}</p>}
  {error && <p className="text-red-600 text-center">{error}</p>}
</form>
    </section>
  )
}
