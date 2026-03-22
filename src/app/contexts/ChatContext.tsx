"use client"

import {createContext, Dispatch, PropsWithChildren, SetStateAction, use, useState} from "react";
import {ask} from "@/app/service/chatService";

export type Message = {
    actor: "user" | "bot"
    message: string
}

export type ChatContext = {
    message: string
    setMessage: Dispatch<SetStateAction<string>>
    messages: Message[]
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    error: string
    setError: Dispatch<SetStateAction<string>>
    handleAsk(): Promise<void>
}

export const ChatContext = createContext<ChatContext | undefined>(undefined)

export const ChatProvider = ({children}: PropsWithChildren) => {
    const [message, setMessage] = useState<ChatContext["message"]>("")
    const [messages, setMessages] = useState<ChatContext["messages"]>([])
    const [loading, setLoading] = useState<ChatContext["loading"]>(false)
    const [error, setError] = useState<ChatContext["error"]>("")

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


    return <ChatContext
        value={{message, setMessage, messages, loading, setLoading, error, setError, handleAsk}}>
        {children}
    </ChatContext>
}


export const useChatContext = () => {
    const context = use(ChatContext);

    if (!context) {
        throw new Error("ChatContext must be used inside ChatProvider")
    }

    return context;
}