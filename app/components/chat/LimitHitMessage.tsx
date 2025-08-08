import { Link } from "react-router";

import { formatDate } from "@/lib/format";
import { MESSAGE_LIMIT } from "@/routes/chat";

import Message from "./Message";

const DATE_TIME_FORMAT_OPTIONS = {
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  month: "short",
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
      className="text-muted-foreground"
      // eslint-disable-next-line jsx-a11y/aria-role
      role="assistant"
    >
      <p>
        Thanks for chatting 💜 Unfortunately, you&apos;ve reached my message
        limit.
        {messageCountResetDate && (
          <span>
            {" "}
            You&apos;ll have {MESSAGE_LIMIT} new messages available on{" "}
            {resetMessageCount}.
          </span>
        )}
        <br />
        In the meantime, I&apos;d love to hear from you —{" "}
        <Link className="text-foreground underline" to="/#contact">
          send me a message
        </Link>
        !
      </p>
    </Message>
  );
}
