"use client"
import {useState} from "react"
import Markdown from 'react-markdown'
import {ask} from "@/app/service/chatService";

type Message = {
    actor: "user" | "bot"
    message: string
}

const startMessages: Message[] = [
    {
        actor: "bot",
        message: "How I can help you today?",
    },
    // {
    //     actor: "user",
    //     message: "Can you help me find courses related to leadership?",
    // },
    // {
    //     actor: "bot",
    //     message: "I found four relevant courses to [your](https://google.com) question.",
    // },
] as const

const Page = () => {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>(startMessages)

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="flex flex-col gap-2 bg-white text-black min-w-1/2 min-h-1/2">
                <div className="flex flex-col gap-2 px-4 py-2">
                    {messages.map((m, i) => (
                        <div
                            key={`message-${i}`}
                            className={`${m.actor === "user" ? "self-end" : "self-start"}`}
                        >
                            {m.actor === "user" ? <span>{m.message}</span> : <Markdown>{m.message}</Markdown>}
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
                            ask(message).then(r => {
                                alert(r.answer)
                                setMessages((prevMessages) => [...prevMessages, {actor: "user", message: message}, {actor: "bot", message: r.answer}])
                            })
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
