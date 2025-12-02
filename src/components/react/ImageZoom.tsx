import Zoom, {
  type ControlledProps,
  type UncontrolledProps,
} from "react-medium-image-zoom";
import { cn } from "@/lib/utils";
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus";

type ImageZoomProps = UncontrolledProps & {
  isZoomed?: ControlledProps["isZoomed"];
  onZoomChange?: ControlledProps["onZoomChange"];
  className?: string;
  backdropClassName?: string;
};

export default function ImageZoom({
  className,
  backdropClassName,
  ...props
}: ImageZoomProps) {
  return (
    <div
      className={cn(
        "relative",
        `[&_[data-rmiz-ghost]]:pointer-events-none
        [&_[data-rmiz-ghost]]:absolute`,
        `[&_[data-rmiz-btn-zoom]]:absolute [&_[data-rmiz-btn-zoom]]:right-0
        [&_[data-rmiz-btn-zoom]]:bottom-0 [&_[data-rmiz-btn-zoom]]:m-0
        [&_[data-rmiz-btn-zoom]]:touch-manipulation
        [&_[data-rmiz-btn-zoom]]:rounded-xl
        [&_[data-rmiz-btn-zoom]]:rounded-tr-none
        [&_[data-rmiz-btn-zoom]]:rounded-bl-none
        [&_[data-rmiz-btn-zoom]]:bg-foreground [&_[data-rmiz-btn-zoom]]:p-1.5
        [&_[data-rmiz-btn-zoom]]:text-background
        [&_[data-rmiz-btn-zoom]]:backdrop-blur-lg`,
        "[&_[data-rmiz-content='found']_img]:cursor-zoom-in",
        "[&_[data-rmiz-content='found']_svg]:cursor-zoom-in",
        "[&_[data-rmiz-content='found']_[role='img']]:cursor-zoom-in",
        "[&_[data-rmiz-content='found']_[data-zoom]]:cursor-zoom-in",
        className,
      )}
    >
      <Zoom
        classDialog={cn(
          "[&::backdrop]:hidden",
          `[&[open]]:fixed [&[open]]:m-0 [&[open]]:h-dvh [&[open]]:max-h-none
          [&[open]]:w-dvw [&[open]]:max-w-none [&[open]]:overflow-hidden
          [&[open]]:border-0 [&[open]]:bg-transparent [&[open]]:p-0`,
          `[&_[data-rmiz-modal-overlay]]:absolute
          [&_[data-rmiz-modal-overlay]]:inset-0
          [&_[data-rmiz-modal-overlay]]:transition-all`,
          "[&_[data-rmiz-modal-overlay='hidden']]:bg-transparent",
          `[&_[data-rmiz-modal-overlay='visible']]:bg-background/80
          [&_[data-rmiz-modal-overlay='visible']]:backdrop-blur-md`,
          `[&_[data-rmiz-modal-content]]:relative
          [&_[data-rmiz-modal-content]]:size-full`,
          `[&_[data-rmiz-modal-img]]:absolute
          [&_[data-rmiz-modal-img]]:origin-top-left
          [&_[data-rmiz-modal-img]]:cursor-zoom-out
          [&_[data-rmiz-modal-img]]:transition-transform`,
          `motion-reduce:[&_[data-rmiz-modal-img]]:transition-none
          motion-reduce:[&_[data-rmiz-modal-overlay]]:transition-none`,
          backdropClassName,
        )}
        IconZoom={() => <MagnifyingGlassPlusIcon size={20} weight="duotone" />}
        {...props}
      />
    </div>
  );
}
