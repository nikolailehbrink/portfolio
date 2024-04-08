import { client } from "@/sanity/lib/client";
import { CHAT_QUERY } from "@/sanity/lib/queries";
import type { searchParams } from "@/types/next";
import type { SanityChat } from "@/types/sanity/sanityChat";
import type { Metadata } from "next";
import Chat from "./components/Chat";

export const metadata: Metadata = {
  title: "Personal AI Chat",
  description:
    "Have a chat with my digital self, which is well versed in many aspects of my life.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  let chatData = null;
  const name = searchParams.name;

  if (name && typeof name === "string") {
    chatData = await client.fetch<SanityChat>(
      CHAT_QUERY,
      {
        slug: name.toLowerCase(),
      },
      {
        cache: "no-cache",
      },
    );
  }

  return (
    <div className="container mx-auto mb-4 mt-4 flex flex-1 flex-col overflow-hidden max-sm:pr-0 sm:mt-8">
      <h1 className="mb-6 text-5xl font-bold sm:mt-2 sm:text-center">
        Let&apos;s chat!
      </h1>
      <Chat customChat={chatData} />
    </div>
  );
}
