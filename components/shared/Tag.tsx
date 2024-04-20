import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };
export default function Tag({ className, children }: Props) {
  return (
    <span
      className={cn(
        "rounded bg-sky-950 px-2 py-1 text-sm text-sky-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
