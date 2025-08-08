import { FileCodeIcon, FolderSimpleIcon } from "@phosphor-icons/react";
import { track } from "@vercel/analytics/react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LANGUAGE_FILE_ICONS } from "@/lib/shiki/fileIcons";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"pre"> & {
  "data-code"?: string;
  "data-filename"?: string;
  "data-language"?: string;
  "data-no-copy"?: true;
};

export default function CodeBlock({ children, className, ...props }: Props) {
  const code = props["data-code"];
  const language = props["data-language"];
  const filename = props["data-filename"];
  const noCopy = props["data-no-copy"];

  const filePaths = filename ? filename.split("/") : [];
  const LanguageIcon = language
    ? (LANGUAGE_FILE_ICONS.get(language) ?? FileCodeIcon)
    : FileCodeIcon;
  const { copiedText, copyToClipboard, idle } = useCopyToClipboard();
  return (
    <figure className="group/code-block rounded-xl offset-border">
      {filePaths.length > 0 ? (
        <figcaption
          className="flex items-center justify-between rounded-t-xl
            bg-neutral-800 px-3 py-2 text-xs text-neutral-400"
        >
          <div className="flex items-center gap-x-0.5">
            {filePaths.map((name, index) => {
              const isLast = index === filePaths.length - 1;
              return (
                <span
                  className={cn(
                    "inline-flex items-center gap-x-0.5",
                    isLast ? "text-foreground" : "",
                  )}
                  key={`${name}-${index}`}
                >
                  {filePaths.length > 1 &&
                    (!isLast ? (
                      <FolderSimpleIcon
                        aria-hidden="true"
                        size={20}
                        weight="duotone"
                      />
                    ) : null)}
                  {name}
                  {!isLast && <span>/</span>}
                </span>
              );
            })}
          </div>
          {language && <LanguageIcon size={20} weight="duotone" />}
        </figcaption>
      ) : null}
      <div className="relative">
        <pre
          {...props}
          className={cn(
            className,
            `not-prose relative overflow-x-auto rounded-xl border
            border-neutral-800 bg-neutral-900! px-4 py-3 text-sm ${
            filename ? "mt-0 rounded-t-none" : "" }`,
          )}
        >
          {children}
        </pre>
        {code && !noCopy ? (
          <button
            aria-label={idle ? "Copy code to clipboard" : "Code copied"}
            className={`absolute top-2 right-2 rounded-md bg-neutral-800 p-2
              py-1.5 text-right font-sans text-xs text-neutral-400 opacity-0
              shadow-sm transition-all group-hover/code-block:opacity-100
              focus:opacity-100 ${
              idle ? "cursor-pointer hover:text-neutral-300" : "" }
              active:bg-neutral-700`}
            disabled={!idle}
            onClick={() => {
              copyToClipboard(code);
              track("copy-code-block", {
                code,
              });
            }}
            tabIndex={0}
            title={idle ? "Copy code to clipboard" : "Code copied"}
          >
            {copiedText}
          </button>
        ) : null}
      </div>
    </figure>
  );
}
