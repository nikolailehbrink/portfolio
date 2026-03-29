import type { UseChatHelpers } from "@ai-sdk/react";
import { useState } from "react";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

const thinkingMessages = [
  "Let me think about that...",
  "One sec, I have that somewhere...",
  "Ooh, I know this one...",
  "Hmm, let me dig that up...",
  "On it, give me a sec...",
  "Ringing a bell...",
];
import LoadingMessage from "./LoadingMessage";
import WelcomeMessage from "./WelcomeMessage";
import Message from "./Message";
import ErrorMessage from "./ErrorMessage";
import LimitHitMessage from "./LimitHitMessage";
import type { MyUIMessage } from "@/pages/api/chat";

export default function Body({
  messages,
  status,
  isDisabled = false,
  messageCountResetDate,
}: Pick<UseChatHelpers<MyUIMessage>, "messages" | "status"> & {
  isDisabled?: boolean;
  messageCountResetDate?: Date;
}) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const containerRef = useScrollToBottom();

  return (
    <div
      ref={containerRef}
      aria-live="polite"
      className="flex grow flex-col gap-4 overflow-y-auto pr-4"
    >
      {/* Don't show if user starts new chat with Message Limit hit */}
      {showWelcomeMessage && !(messages.length === 0 && isDisabled === true) ? (
        <WelcomeMessage
          setShowWelcomeMessage={setShowWelcomeMessage}
          showCloseButton={messages.length > 0}
        />
      ) : null}
      {messages.map(({ id, role, parts }, index) => (
        <Message key={id} role={role}>
          {parts.map((part) => {
            switch (part.type) {
              case "text":
                return part.text;
              case "tool-queryTool":
                return null;
            }
          })}
          {role === "assistant" &&
            !parts.some((p) => p.type === "text" && p.text) && (
              <span className="animate-pulse italic">
                {thinkingMessages[index % thinkingMessages.length]}
              </span>
            )}
        </Message>
      ))}
      {status === "submitted" && <LoadingMessage />}
      {isDisabled && (
        <LimitHitMessage messageCountResetDate={messageCountResetDate} />
      )}
      {status === "error" && <ErrorMessage />}
    </div>
  );
}
