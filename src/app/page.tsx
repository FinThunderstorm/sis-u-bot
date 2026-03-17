"use client"
import { useState } from "react"

type Message = {
  actor: string
  message: string
}

const Page = () => {
  const [message, setMessage] = useState<string>("")

  const messages: Message[] = [
    {
      actor: "user",
      message: "Can you help me find courses related to leadership?",
    },
    {
      actor: "bot",
      message: "I found four relevant courses to your question.",
    },
  ]

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-2 bg-white text-black min-w-1/2 min-h-1/2">
        <div className="flex flex-col gap-2 px-4 py-2">
          {messages.map((m, i) => (
            <div
              key={`message-${i}`}
              className={`${m.actor === "user" ? "self-end" : "self-start"}`}
            >
              {m.message}
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-1">
          <input
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2"
          />
          <button
            className="p-2"
            onClick={() => {
              alert(message)
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
