import type { Metadata } from "next";

import Chat from "@/components/pages/chat/Chat";
import { loadChat } from "@/sanity/loader/loadQuery";

type SearchParams = { [key: string]: string | string[] | undefined };

export const metadata: Metadata = {
  title: "Personal AI Chat",
  description:
    "Have a chat with my digital self, which is well versed in many aspects of my life.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const name = searchParams.name;
  const initial =
    name && typeof name === "string" ? await loadChat(name) : null;

  return (
    <div className="container mx-auto mb-4 mt-4 flex flex-1 flex-col overflow-hidden max-sm:pr-0 sm:mt-8">
      <h1 className="mb-6 text-5xl font-bold sm:mt-2 sm:text-center">
        Let&apos;s chat!
      </h1>
      <Chat customChat={initial?.data ?? null} />
    </div>
  );
}
