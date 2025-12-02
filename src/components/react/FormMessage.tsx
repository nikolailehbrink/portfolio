import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";

export default function FormMessage({
  children,
  className,
  icon: Icon = WarningIcon,
  iconSize = 16,
  ...props
}: {
  children: React.ReactNode;
  icon?: Icon;
  iconSize?: number;
} & React.ComponentProps<"div">) {
  if (!children) {
    return null;
  }
  return (
    <div
      className={cn("flex items-center gap-1 text-sm text-red-400", className)}
      {...props}
    >
      <Icon size={iconSize} weight="duotone" className="shrink-0" />
      {children}
    </div>
  );
}
