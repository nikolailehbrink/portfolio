import { useChat } from "@ai-sdk/react";
import { useRevalidator } from "react-router";

import Actions from "@/components/chat/Actions";
import Body from "@/components/chat/Body";
import ExampleMessage from "@/components/chat/ExampleMessage";
import { EXAMPLE_MESSAGES } from "@/data/exampleChatMessages";
import { typedMessageCountCookie } from "@/lib/cookies.server";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";

import type { Route } from "./+types";

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
    handleInputChange,
    handleSubmit,
    input,
    messages,
    reload,
    setInput,
    status,
    stop,
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
        disabled={disableChat}
        messageCountResetDate={messageCountResetDate}
        messages={messages}
        status={status}
      />
      {!disableChat ? (
        <>
          <div className="flex justify-center gap-2">
            {EXAMPLE_MESSAGES.map(({ heading, icon: Icon, message }) => (
              <ExampleMessage
                key={heading}
                message={message}
                setInput={setInput}
              >
                <Icon size={20} weight="duotone" />
                <span className="max-sm:sr-only">{heading}</span>
              </ExampleMessage>
            ))}
          </div>
          <Actions
            disabled={disableChat}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            input={input}
            reload={reload}
            status={status}
            stop={stop}
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
      content: description,
      name: "description",
    },
    {
      content: title,
      property: "og:title",
    },
    { content: description, property: "og:description" },
    {
      content: ogImagePath,
      property: "og:image",
    },
    {
      content: "image/png",
      property: "og:image:type",
    },
    {
      content: "630",
      property: "og:image:height",
    },
    {
      content: "1200",
      property: "og:image:width",
    },
  ];
});
