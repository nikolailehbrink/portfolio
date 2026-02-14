import type { UIMessage } from "ai";
import Avatar from "@/components/react/chat/Avatar";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { cn } from "@/lib/utils";

export default function Message({
  role,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> &
  Pick<UIMessage, "role"> & {
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
          `sticky top-0 flex size-[38px] shrink-0 overflow-hidden rounded-full
          border`,
          {
            "items-center justify-center border-border bg-muted":
              role === "user",
          },
        )}
      >
        {role === "user" ? (
          <UserIcon size={20} weight="duotone" />
        ) : (
          <Avatar className="size-10 object-center" />
        )}
      </div>
      <MessageBubble role={role}>{children}</MessageBubble>
    </div>
  );
}

function MessageBubble({
  role,
  children,
  className,
}: {
  role: UIMessage["role"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-prose rounded-xl border px-3 py-1.5",
        role === "user" ? "border-border bg-muted" : "bg-card sm:bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}
