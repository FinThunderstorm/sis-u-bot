import {useChatContext} from "@/app/contexts/ChatContext";

export const ChatInput = () => {
    const {message, error, loading, setMessage, setError, handleAsk} = useChatContext();

    return (
        <div className="chatbox-input flex flex-row gap-2 p-2 items-start">
            <div className="flex flex-col w-full">
                <input
                    data-test-id="chat-input"
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
                className=" p-2 border-3 border-blue-700 text-black font-semibold rounded-lg"
                onClick={handleAsk}
                disabled={loading}
            >
                Send
            </button>
        </div>
    )
}