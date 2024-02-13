import { PauseCircle, RefreshCw } from "lucide-react";

import { Button } from "../ui/button";
import type { UseChatHelpers } from "ai/react";

export default function ChatActions({
  stop,
  reload,
  showStop,
  showReload,
}: Pick<UseChatHelpers, "stop" | "reload"> & {
  showStop: boolean;
  showReload: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {showStop && (
        <Button size="sm" onClick={() => stop()}>
          <PauseCircle className="size-4" />
          Stop generating
        </Button>
      )}
      {showReload && (
        <Button size="sm" onClick={() => reload()}>
          <RefreshCw className="size-4" />
          Regenerate
        </Button>
      )}
    </div>
  );
}
