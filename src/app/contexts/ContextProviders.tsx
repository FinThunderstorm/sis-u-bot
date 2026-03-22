"use client"

import {PropsWithChildren} from "react";
import {ChatProvider} from "@/app/contexts/ChatContext";

export const ContextProviders = ({children}: PropsWithChildren) => {
    return <ChatProvider>{children}</ChatProvider>
}