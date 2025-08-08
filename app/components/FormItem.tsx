import { cn } from "@/lib/utils";

export default function FormItem({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("group/form-item flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
