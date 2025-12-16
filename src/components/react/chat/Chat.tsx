import Actions from "@/components/react/chat/Actions";
import Body from "@/components/react/chat/Body";
import ExampleMessage from "@/components/react/chat/ExampleMessage";
import { EXAMPLE_MESSAGES } from "@/data/example-chat-messages";
import type { DataParts, MyUIMessage } from "@/pages/api/chat";
import { useChat } from "@ai-sdk/react";
import { useState, type FormEvent } from "react";

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
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled || !input.trim()) {
      return;
    }
    sendMessage({ text: input });
    setInput("");
  };

  // https://play.tailwindcss.com/ztVLNgodlA
  return (
    <div
      className="mt-1 mb-4 flex max-w-5xl grow flex-col gap-2 overflow-hidden
        sm:rounded-xl sm:border sm:bg-neutral-900 sm:py-4 sm:pl-4
        sm:offset-border"
    >
      <Body
        messages={messages}
        status={status}
        isDisabled={disabled}
        messageCountResetDate={resetDate}
      />
      {!disabled ? (
        <>
          <div className="flex justify-center gap-2">
            {EXAMPLE_MESSAGES.map(({ heading, message, icon: Icon }) => (
              <ExampleMessage
                key={heading}
                setInput={setInput}
                message={message}
              >
                <Icon size={20} weight="duotone" />
                <span className="max-sm:sr-only">{heading}</span>
              </ExampleMessage>
            ))}
          </div>
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
