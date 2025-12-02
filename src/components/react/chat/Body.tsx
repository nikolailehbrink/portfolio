import type { UseChatHelpers } from "@ai-sdk/react";
import { useState } from "react";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
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
      className="flex grow flex-col gap-4 overflow-y-auto pr-4"
    >
      {/* Don't show if user starts new chat with Message Limit hit */}
      {showWelcomeMessage && !(messages.length === 0 && isDisabled === true) ? (
        <WelcomeMessage
          setShowWelcomeMessage={setShowWelcomeMessage}
          showCloseButton={messages.length > 0}
        />
      ) : null}
      {messages.map(({ id, role, parts }) => (
        <Message key={id} role={role}>
          {parts.map((part) => {
            switch (part.type) {
              case "text":
                return part.text;
              case "tool-queryTool": {
                if (!part.output) {
                  return (
                    <span className="animate-pulse italic">
                      Let me think about that...
                    </span>
                  );
                }
              }
            }
          })}
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
