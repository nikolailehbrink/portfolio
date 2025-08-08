import avatar from "@/assets/images/avatar.webp";
import { cn } from "@/lib/utils";

export default function Avatar({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      alt="Avatar"
      className={cn("object-cover", className)}
      height={400}
      src={avatar}
      title="Profile image"
      width={400}
      {...props}
    />
  );
}
