import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        `flex items-center gap-1 text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none
        group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed
        peer-disabled:opacity-50
        group-has-[:required]/form-item:after:text-red-400
        group-has-[:required]/form-item:after:content-["*"]`,
        className,
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
