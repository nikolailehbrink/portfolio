import Message from "./Message";

export default function LoadingMessage() {
  return (
    <Message
      // eslint-disable-next-line jsx-a11y/aria-role
      role="assistant"
    >
      <div className="flex h-6 items-center gap-[3px]">
        <span className="sr-only">Loading...</span>
        <div
          className="size-1.5 animate-pulse rounded-full bg-neutral-300
            delay-300 [animation-delay:-0.3s]"
        />
        <div
          className="size-1.5 animate-pulse rounded-full bg-neutral-300
            [animation-delay:-0.15s]"
        />
        <div className="size-1.5 animate-pulse rounded-full bg-neutral-300" />
      </div>
    </Message>
  );
}
