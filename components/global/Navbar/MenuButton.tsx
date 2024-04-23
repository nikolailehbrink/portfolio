import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef, type Dispatch, type SetStateAction } from "react";

type Props = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const MenuButton = forwardRef<HTMLButtonElement, Props>(function MenuButton(
  { showMenu, setShowMenu, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      id="menubutton"
      aria-haspopup="true"
      aria-expanded={showMenu}
      aria-controls="navigation"
      aria-label="Open Menu"
      variant={"outline"}
      size={"icon"}
      className="fixed right-4 top-4 flex size-12 cursor-pointer flex-col
        items-start gap-0 rounded border-2 p-2 lg:hidden"
      onClick={() => setShowMenu(!showMenu)}
      {...props}
    >
      <span
        className={cn(
          "my-[3px] h-[3px] w-1/2 rounded bg-neutral-100 transition-all",
          showMenu && "w-full origin-top-left translate-x-[5px] rotate-45",
        )}
      ></span>
      <span
        className={cn(
          "my-[3px] h-[3px] w-full rounded bg-neutral-100 transition-all",
          showMenu && "translate-y-[1px] -rotate-45",
        )}
      ></span>
      <span
        className={cn(
          "my-[3px] h-[3px] w-3/4 rounded bg-neutral-100 transition-all",
          showMenu && "w-0 -rotate-45 opacity-0",
        )}
      ></span>
    </Button>
  );
});

export default MenuButton;
