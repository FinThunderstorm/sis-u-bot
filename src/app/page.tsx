"use client"
import {Header} from "@/app/components/Header";
import {ChatInput} from "@/app/components/ChatInput";
import {MessageViewer} from "@/app/components/MessageViewer";
import {ChatMessage} from "@/app/components/ChatMessage";

const Page = () => {
    return (
        <div className="layout">
            <Header/>
            <main className="chatbox-layout bg-white text-black p-2" aria-labelledby="chatbox-title">
                <article className="chatbox-messages flex flex-col gap-2 px-4 py-2 overflow-auto h-full">
                    <ChatMessage message={{actor: "bot", message: "How I can help you today?"}}/>
                    <MessageViewer/>
                </article>
                <ChatInput/>
            </main>
        </div>
    )
}

export default Page
