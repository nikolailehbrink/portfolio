import { Link } from "react-router";

import Message from "./Message";

export default function ErrorMessage() {
  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <Message role="assistant">
      <p className="text-red-400">
        I am sorry, but there is currently an error on my end. Try to reload the
        message next to the text field or{" "}
        <Link className="underline" to="mailto:mail@nikolailehbr.ink">
          chat with the real me
        </Link>
        .
      </p>
    </Message>
  );
}
