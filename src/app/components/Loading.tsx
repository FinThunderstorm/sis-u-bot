const Circle = () => (
    <svg className="size-4  motion-safe:animate-bounce text-black " xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 16 16">
        <circle className="opacity-100" cx="8" cy="8" r="6" stroke="currentColor"
                strokeWidth="3"></circle>
    </svg>
)

export const Loading = () => <div className="flex flex-row gap-2 ">
    <Circle/>
    <Circle/>
    <Circle/>
    <span className="sr-only">loading...</span>
</div>