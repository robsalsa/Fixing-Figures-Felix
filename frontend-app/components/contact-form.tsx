"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // This is a sample: replace with your API call if you have one.
    await new Promise((r) => setTimeout(r, 700));

    setStatus("sent");
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            className="w-full rounded-md border px-3 py-2"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={status === "sending" || status === "sent"}>
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send message"}
          </Button>
          {status === "sent" ? <span className="text-sm text-green-600">Thanks — we'll be in touch.</span> : null}
        </div>
      </form>
    </div>
  );
}
