import { cn } from "@/lib/utils";

type Props = { title: string; className?: string };
export default function Tag({ className, title }: Props) {
  return (
    <div
      className={cn(
        "px-2 bg-blue-900 text-blue-400 font-bold rounded-lg text-sm py-1",
        className
      )}
    >
      # {title}
    </div>
  );
}
