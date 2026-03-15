import { Badge } from "@/components/react/ui/badge";
import { Star } from "@phosphor-icons/react";

export default function MustTryBadge() {
  return (
    <Badge className="bg-amber-950 py-0 align-text-top text-amber-400">
      <Star weight="fill" size={12} />
      Must try
    </Badge>
  );
}
