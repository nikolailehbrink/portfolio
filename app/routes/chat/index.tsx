import Actions from "@/components/chat/Actions";
import Body from "@/components/chat/Body";
import ExampleMessage from "@/components/chat/ExampleMessage";
import { EXAMPLE_MESSAGES } from "@/data/exampleChatMessages";
import { useChat } from "@ai-sdk/react";
import type { Route } from "./+types";
import { typedMessageCountCookie } from "@/lib/cookies.server";
import { useRevalidator } from "react-router";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";
import ogImage from "./og-image.webp";

export const MESSAGE_LIMIT = import.meta.env.PROD ? 10 : 2;

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const messageCount = await typedMessageCountCookie.parse(cookieHeader);

  return {
    disableChat: messageCount !== null && messageCount >= MESSAGE_LIMIT,
    messageCountResetDate: typedMessageCountCookie.expires,
  };
};

export default function Chat({ loaderData }: Route.ComponentProps) {
  const { disableChat, messageCountResetDate } = loaderData;
  const revalidator = useRevalidator();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    status,
    stop,
    reload,
  } = useChat({
    onFinish() {
      // Check for the message count
      revalidator.revalidate();
    },
  });

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
        disabled={disableChat}
        messageCountResetDate={messageCountResetDate}
      />
      {!disableChat ? (
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
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            input={input}
            reload={reload}
            status={status}
            stop={stop}
            disabled={disableChat}
          />
        </>
      ) : null}
    </div>
  );
}

export const meta: Route.MetaFunction = mergeRouteModuleMeta(({ matches }) => {
  const { origin } = matches[0].data;
  const ogImagePath = origin + ogImage;

  const title = "Personal AI Chat | Nikolai Lehbrink";
  const description =
    "Chat with my personal AI assistant, which is well versed in many aspects of my life.";
  return [
    {
      title,
    },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    { property: "og:description", content: description },
    {
      property: "og:image",
      content: ogImagePath,
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
  ];
});
