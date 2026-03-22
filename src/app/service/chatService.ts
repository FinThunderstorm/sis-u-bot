import * as z from "zod"

export const ask = async (question: string): Promise<ChatResponse> => {
    const url = "https://api.sis-u-bot.alanen.dev/";
    try {
        const response = await fetch(url, {method: "POST", body: question});
        if (!response.ok) {
            return {answer: "Something went wrong. Try again.", success: false}
        }

        const result = await response.json();
        return ChatResponse.parse(result);
    } catch (error) {
        return {answer: "Something went wrong. Try again.", success: false}
    }
}

export const ChatResponse = z.object({
    answer: z.string(),
    success: z.boolean()
})
export type ChatResponse = z.infer<typeof ChatResponse>;