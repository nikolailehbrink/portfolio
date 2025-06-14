import { cn } from "@/lib/utils";

export default function FormItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("group/form-item flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
