import AvatarImage from "../AvatarImage";
import UserCircle from "@/assets/icons/unicons/user-circle.svg";

export default function ChatAvatar({ role }: { role: string }) {
  if (role === "user") {
    return (
      <div className="flex size-10 shrink-0 select-none items-center justify-center rounded-full border-2 border-blue ">
        <UserCircle className="size-8" />
      </div>
    );
  }

  return (
    <AvatarImage className="size-10 rounded-full border-2 border-orange" />
  );
}
