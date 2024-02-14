import Chat from "@/components/chat/Chat";

export default function Page() {
  return (
    <div className="container mx-auto mb-4 mt-4 flex flex-1 flex-col overflow-hidden max-sm:pr-0 sm:mt-8">
      <h1 className="mb-6 text-5xl font-bold sm:mt-2 sm:text-center">
        Let&apos;s chat!
      </h1>
      <Chat />
    </div>
  );
}
