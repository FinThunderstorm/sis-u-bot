export const ask = async (question: string): Promise<string> => {
    const url = "https://api.sis-u-bot.alanen.dev/";
    try {
        const response = await fetch(url, {method: "POST", body: question});
        if (!response.ok) {
            return "Something went wrong. Try again."
        }

        const result = await response.json();
        return result as string;
    } catch (error) {
        return "Something went wrong. Try again."
    }
}