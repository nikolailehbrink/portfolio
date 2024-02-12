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
    <div className="space-x-4">
      {showStop && (
        <Button variant="outline" size="sm" onClick={() => stop()}>
          <PauseCircle className="mr-2 h-4 w-4" />
          Stop generating
        </Button>
      )}
      {showReload && (
        <Button variant="outline" size="sm" onClick={() => reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      )}
    </div>
  );
}
