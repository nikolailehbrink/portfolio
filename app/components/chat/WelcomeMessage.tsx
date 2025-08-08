import { XIcon } from "@phosphor-icons/react";

import Message from "./Message";

export default function WelcomeMessage({
  setShowWelcomeMessage,
  showCloseButton,
}: {
  setShowWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
  showCloseButton: boolean;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <Message role="assistant">
      <p className="text-muted-foreground">
        Hi there, this is the real Nikolai! 👋 <br />
        Please note that while the AI chat is pretty smart, it&apos;s not
        perfect and can <i>sometimes</i> make mistakes.
        <br /> Now that that&apos;s out of the way, ask me anything! 😊
      </p>
      {showCloseButton && (
        <button
          aria-label="Close note"
          className="absolute top-0 right-0 cursor-pointer rounded-se-xl
            rounded-es-xl border bg-neutral-900 p-1.5 hover:bg-neutral-800"
          onClick={() => setShowWelcomeMessage(false)}
        >
          <XIcon size={16} weight="bold" />
        </button>
      )}
    </Message>
  );
}
