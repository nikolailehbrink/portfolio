import type { UIMessage } from "ai";

import { UserIcon } from "@phosphor-icons/react";

import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";

export default function Message({
  children,
  className,
  role,
  ...props
}: Pick<UIMessage, "role"> &
  React.ComponentProps<"div"> & {
    children: React.ReactNode;
  }) {
  return (
    <div
      className={cn(
        "relative flex gap-1",
        role === "user"
          ? "flex-row-reverse self-end sm:ms-24"
          : "self-start sm:me-24",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "sticky top-0 flex size-[38px] shrink-0 rounded-full border",
          {
            "items-center justify-center border-neutral-700 bg-neutral-800":
              role === "user",
          },
        )}
      >
        {role === "user" ? (
          <UserIcon size={20} weight="duotone" />
        ) : (
          <Avatar className="rounded-full" />
        )}
      </div>
      <MessageBubble role={role}>{children}</MessageBubble>
    </div>
  );
}

function MessageBubble({
  children,
  className,
  role,
}: {
  children: React.ReactNode;
  className?: string;
  role: UIMessage["role"];
}) {
  return (
    <div
      className={cn(
        "max-w-prose rounded-xl border px-3 py-1.5",
        role === "user"
          ? "border-neutral-700 bg-neutral-800"
          : "bg-neutral-900 sm:bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}
