import { type Icon, WarningIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export default function FormMessage({
  children,
  className,
  icon: Icon = WarningIcon,
  iconSize = 16,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
  icon?: Icon;
  iconSize?: number;
}) {
  if (!children) {
    return null;
  }
  return (
    <div
      className={cn("flex items-center gap-1 text-sm text-red-400", className)}
      {...props}
    >
      <Icon className="shrink-0" size={iconSize} weight="duotone" />
      {children}
    </div>
  );
}
