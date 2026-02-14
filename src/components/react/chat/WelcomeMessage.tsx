import Message from "./Message";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";

export default function WelcomeMessage({
  showCloseButton,
  setShowWelcomeMessage,
}: {
  showCloseButton: boolean;
  setShowWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
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
          type="button"
          onClick={() => setShowWelcomeMessage(false)}
          aria-label="Close note"
          className="absolute top-0 right-0 cursor-pointer rounded-se-xl
            rounded-es-xl border bg-card p-1.5 hover:bg-muted"
        >
          <XIcon size={16} weight="bold" />
        </button>
      )}
    </Message>
  );
}
