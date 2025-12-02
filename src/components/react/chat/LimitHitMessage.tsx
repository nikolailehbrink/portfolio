import { AI_CHAT_MESSAGE_LIMIT } from "@/consts";
import Message from "./Message";
import { formatDate } from "@/lib/format";

const DATE_TIME_FORMAT_OPTIONS = {
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
} satisfies Intl.DateTimeFormatOptions;

export default function LimitHitMessage({
  messageCountResetDate,
}: {
  messageCountResetDate?: Date;
}) {
  const resetMessageCount = messageCountResetDate
    ? formatDate(messageCountResetDate, DATE_TIME_FORMAT_OPTIONS)
    : null;
  return (
    <Message
      // eslint-disable-next-line jsx-a11y/aria-role
      role="assistant"
      className="text-muted-foreground"
    >
      <p>
        Thanks for chatting 💜 Unfortunately, you&apos;ve reached my message
        limit.
        {messageCountResetDate && (
          <span>
            {" "}
            You&apos;ll have {AI_CHAT_MESSAGE_LIMIT} new messages available on{" "}
            {resetMessageCount}.
          </span>
        )}
        <br />
        In the meantime, I&apos;d love to hear from you —{" "}
        <a href="/#contact" className="text-foreground underline">
          send me a message
        </a>
        !
      </p>
    </Message>
  );
}
