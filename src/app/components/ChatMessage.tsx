import {AcademicCapIcon, UserIcon} from "@heroicons/react/24/solid";
import {Loading} from "@/app/components/Loading";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Message} from "@/app/contexts/ChatContext";

export const ChatMessage = ({message: m, loading}: { message: Message, loading?: boolean }) => {
    return <section
        className={`${m.actor === "user" ? "self-end bg-cyan-100" : "self-start bg-gray-100"} p-4 rounded-lg`}
    >
        <div className="flex flex-row gap-8 items-center">
            {m.actor === "bot" &&
                <AcademicCapIcon className="h-12 bg-white p-2 rounded-full self-start"/>}
            {loading && <Loading/>}
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
    </section>
}