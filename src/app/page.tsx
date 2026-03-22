"use client"
import {useState} from "react"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {AcademicCapIcon, UserIcon} from "@heroicons/react/24/solid";
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
    {
        actor: "user",
        message: "courses",
    },
    {
        actor: "bot",
        message: "Based on your previous completed courses, I suggest you take following course:\n\n |Course |Course code|Credits|\n |------------------------------------------|-----------|-------|\n |Digital Transformation Management |YY00BW98 |5 |\n ",
    },
    {
        actor: "user",
        message: "where",
    },
    {
        actor: "bot",
        message: "You can find your student number from `My profile > Personal information`",
    },
    {
        actor: "user",
        message: "evaluated",
    },
    {
        actor: "bot",
        message: "You have got following evaluations in last 30 days:\n\n |Course                                    |Course code|Credits|Grade|\n |------------------------------------------|-----------|-------|-----|\n |Software Engineering Models and Modeling  |CT60A5103  |6      |5    |\n |Foundations of Software Product Management|CT70A6201  |6      |4    |\n  |Requirements Engineering                  |CT70A2000  |6      |5    |\n ",
    },
    {
        actor: "user",
        message: "unknown",
    },
    {
        actor: "bot",
        message: "I did not understand your question, please rephrase your question and try again.",
    },
] as const

const Circle = () => (
    <svg className="size-4  motion-safe:animate-bounce text-black " xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 16 16">
        <circle className="opacity-100" cx="8" cy="8" r="6" stroke="currentColor"
                strokeWidth="3"></circle>
    </svg>
)

const ChatMessage = ({message: m, loading}: { message: Message, loading?: boolean }) => {
    return <div
        className={`${m.actor === "user" ? "self-end bg-cyan-100" : "self-start bg-gray-100"} p-4 rounded-lg`}
    >
        <div className="flex flex-row gap-8 items-center">
            {m.actor === "bot" &&
                <AcademicCapIcon className="h-12 bg-white p-2 rounded-full self-start"/>}
            {loading &&
                <div className="flex flex-row gap-2 ">
                    <Circle/>
                    <Circle/>
                    <Circle/>
                </div>}
            {m.actor === "user" ? <span>{m.message}</span> :
                <div className="flex flex-col gap-4">
                    <Markdown remarkPlugins={[remarkGfm]} components={{
                        table(props) {
                            const {node, children, ...rest} = props
                            return <table className="table-auto border" {...rest}>{children}</table>
                        },
                        th(props) {
                            const {node, children, ...rest} = props
                            return <th className="border px-4 py-2" {...rest}>{children}</th>
                        },
                        td(props) {
                            const {node, children, ...rest} = props
                            return <td className="border px-4 py-2" {...rest}>{children}</td>
                        }
                    }}>{m.message}</Markdown></div>}
            {m.actor === "user" &&
                <UserIcon className="h-12 bg-white p-2 rounded-full self-start"/>}
        </div>
    </div>
}

const Page = () => {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>(startMessages)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleAsk = async (): Promise<void> => {
        if (!message) {
            setError("Please input your message")
            return
        }
        if (loading) return

        setMessages((prevMessages) => [...prevMessages, {actor: "user", message: message}])
        setLoading(true)
        const response = await ask(message)
        setMessages((prevMessages) => [...prevMessages, {actor: "bot", message: response.answer}])
        if (response.success) {
            setMessage("")
        }
        setLoading(false)
    }

    return (
        <div className="layout">
            <div className="chatbox-layout bg-white text-black p-2">
                <div className="chatbox-messages flex flex-col gap-2 px-4 py-2 overflow-auto h-full">
                    {messages.map((m, i) => (
                        <ChatMessage message={m} key={`message-${i}`}/>
                    ))}
                    {loading && <ChatMessage message={{actor: "bot", message: ""}} loading={true}/>}
                </div>
                <div className="chatbox-input flex flex-row gap-2 p-2 items-start">
                    <div className="flex flex-col w-full">
                        <input
                            placeholder="Type your question here"
                            value={message}
                            onChange={(e) => {
                                setError("")
                                setMessage(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAsk()
                                }
                            }}
                            className={`p-2 border-3 ${error ? "border-orange-600" : "border-blue-700"} rounded-lg`}
                        />
                        {error && <span className="text-orange-600 text-sm px-2">{error}</span>}
                    </div>
                    <button
                        className=" p-2.5 bg-blue-700 text-white rounded-lg"
                        onClick={handleAsk}
                        disabled={loading}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page
