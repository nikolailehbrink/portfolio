import Actions from "@/components/react/chat/Actions";
import Body from "@/components/react/chat/Body";
import Suggestions, {
  Suggestion,
  SuggestionSkeleton,
} from "@/components/react/chat/Suggestions";
import { EXAMPLE_MESSAGES } from "@/data/example-chat-messages";
import type { DataParts, MyUIMessage } from "@/pages/api/chat";
import { suggestionsSchema } from "@/lib/suggestions-schema";
import { experimental_useObject as useObject, useChat } from "@ai-sdk/react";
import { ChatTeardropDotsIcon } from "@phosphor-icons/react/dist/ssr/ChatTeardropDots";
import { useState, type SyntheticEvent } from "react";

export default function Chat({
  isChatDisabled,
  messageCountResetDate,
}: {
  isChatDisabled: boolean;
  messageCountResetDate?: Date;
}) {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(isChatDisabled);
  const [resetDate, setResetDate] = useState<Date | undefined>(
    messageCountResetDate,
  );

  const {
    object: suggestions,
    submit: generateSuggestions,
    isLoading: isSuggestionsLoading,
    clear: clearSuggestions,
  } = useObject({
    api: "/api/chat/suggestions",
    schema: suggestionsSchema,
  });

  const { messages, sendMessage, stop, status, regenerate } =
    useChat<MyUIMessage>({
      onData: ({ data, type }) => {
        if (type === "data-message-limit-reached") {
          const { timestampToChatAgain } =
            // TODO: Type inference should come from MyUIMessage (https://ai-sdk.dev/docs/ai-sdk-ui/streaming-data#setting-up-type-safe-data-streaming)
            // However for me it is not inferring a type for the transient data part
            data as DataParts["message-limit-reached"];
          setResetDate(new Date(timestampToChatAgain));
          setDisabled(true);
        }
      },
      // Kick off follow-ups only once the reply has fully arrived, against a
      // separate endpoint - so the main stream closes immediately and the input
      // is never blocked. The questions then stream in on their own.
      onFinish: ({ message }) => {
        if (message.role !== "assistant") {
          return;
        }
        const text = message.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("\n")
          .trim();
        if (text) {
          generateSuggestions({ text });
        }
      },
    });

  const handleSend = (text: string) => {
    if (disabled || !text.trim()) {
      return;
    }
    // Drop stale follow-ups so they don't linger over the next reply.
    clearSuggestions();
    sendMessage({ text });
    setInput("");
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(input);
  };

  // Follow-ups stream in, so entries can be partial/undefined mid-generation.
  const visibleQuestions = (suggestions?.questions ?? []).filter(
    (question): question is string => Boolean(question?.trim()),
  );

  // https://play.tailwindcss.com/ztVLNgodlA
  return (
    <div
      className="mt-1 mb-4 flex max-w-5xl grow flex-col gap-2 overflow-hidden
        sm:rounded-xl sm:border sm:bg-card sm:py-4 sm:pl-4 sm:offset-border"
    >
      <Body
        messages={messages}
        status={status}
        isDisabled={disabled}
        messageCountResetDate={resetDate}
      />
      {!disabled ? (
        <>
          {messages.length === 0 ? (
            <Suggestions>
              {EXAMPLE_MESSAGES.map(({ heading, message, icon: Icon }) => (
                <Suggestion
                  key={heading}
                  suggestion={message}
                  onClick={setInput}
                >
                  <Icon size={16} weight="duotone" />
                  <span className="max-sm:sr-only">{heading}</span>
                </Suggestion>
              ))}
            </Suggestions>
          ) : status === "ready" ? (
            <Suggestions>
              {visibleQuestions.length === 0 && isSuggestionsLoading
                ? ["w-32", "w-40", "w-28"].map((width) => (
                    <SuggestionSkeleton key={width} className={width} />
                  ))
                : visibleQuestions.map((question, index) => (
                    <Suggestion
                      // Labels change as they stream, so key by index until done.
                      key={isSuggestionsLoading ? index : question}
                      suggestion={question}
                      onClick={setInput}
                      disabled={isSuggestionsLoading}
                      className={
                        isSuggestionsLoading ? "animate-pulse" : undefined
                      }
                    >
                      <ChatTeardropDotsIcon size={16} weight="duotone" />
                      {question}
                    </Suggestion>
                  ))}
            </Suggestions>
          ) : null}
          <Actions
            handleInputChange={(e) => setInput(e.target.value)}
            handleSubmit={handleSubmit}
            input={input}
            regenerate={regenerate}
            status={status}
            stop={stop}
            isInputDisabled={disabled}
          />
        </>
      ) : null}
    </div>
  );
}
