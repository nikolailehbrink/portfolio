import type { UseChatHelpers } from "@ai-sdk/react";

import { useState } from "react";

import { useScrollToBottom } from "@/hooks/useScrollToBottom";

import ErrorMessage from "./ErrorMessage";
import LimitHitMessage from "./LimitHitMessage";
import LoadingMessage from "./LoadingMessage";
import Message from "./Message";
import WelcomeMessage from "./WelcomeMessage";

export default function Body({
  disabled = false,
  messageCountResetDate,
  messages,
  status,
}: Pick<UseChatHelpers, "messages" | "status"> & {
  disabled?: boolean;
  messageCountResetDate?: Date;
}) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const containerRef = useScrollToBottom();

  const lastMessage = messages[messages.length - 1];
  return (
    <div
      className="flex grow flex-col gap-4 overflow-y-auto pr-4"
      ref={containerRef}
    >
      {/* Don't show if user starts new chat with Message Limit hit */}
      {showWelcomeMessage && !(messages.length === 0 && disabled === true) ? (
        <WelcomeMessage
          setShowWelcomeMessage={setShowWelcomeMessage}
          showCloseButton={messages.length > 0}
        />
      ) : null}
      {messages.map(
        ({ content, id, role }) =>
          // See comment below
          content.length > 0 && (
            <Message key={id} role={role}>
              {content}
            </Message>
          ),
      )}
      {(status === "submitted" ||
        // This is because the tool call in api/chat sets the status to "streaming"
        // but doesn't immediately has text content, resulting in an empty textbox before the text is eventually streamed
        (status === "streaming" && lastMessage.content.length === 0)) && (
        <LoadingMessage />
      )}
      {disabled && (
        <LimitHitMessage messageCountResetDate={messageCountResetDate} />
      )}
      {status === "error" && <ErrorMessage />}
    </div>
  );
}
