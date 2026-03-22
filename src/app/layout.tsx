import type {Metadata} from "next"
import "./globals.css"
import {ContextProviders} from "@/app/contexts/ContextProviders";

export const metadata: Metadata = {
    title: 'sis-u-bot',
    description: 'sis-u-bot is your assistant in Sisu',
}

const RootLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en" data-theme="night">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <ContextProviders>
            <body>{children}</body>
        </ContextProviders>
        </html>
    )
}

export default RootLayout
