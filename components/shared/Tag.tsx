import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };
export default function Tag({ className, children }: Props) {
  return (
    <span
      className={cn(
        "px-2 bg-blue-900 text-blue-400 rounded-lg text-sm py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
