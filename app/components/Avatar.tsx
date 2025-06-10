import avatar from "@/assets/images/avatar.jpeg";
import { cn } from "@/lib/utils";

export default function Avatar({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      src={avatar}
      className={cn("object-cover", className)}
      alt="Avatar"
      width={400}
      height={400}
      title="Profile image"
      {...props}
    />
  );
}
