"use client"
import {ChatMessage} from "@/app/components/ChatMessage";
import {useChatContext} from "@/app/contexts/ChatContext";

export const MessageViewer = () => {
    const {messages, loading} = useChatContext();

    return (
        <>
            {messages.map((m, i) => (
                <ChatMessage message={m} key={`message-${i}`}/>
            ))}
            {loading && <ChatMessage message={{actor: "bot", message: ""}} loading={true}/>}
        </>
    )
}