import { cn } from "@/lib/utils";
import { Warning, type Icon } from "@phosphor-icons/react";

export default function FormMessage({
  children,
  className,
  icon: Icon = Warning,
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
