import type { RefObject } from "react";
import { useEffect } from "react";

export function useMenuClickOutside(
  menuRef: RefObject<HTMLElement>,
  buttonRef: RefObject<HTMLElement>,
  onClickOutside: () => void,
  isMenuOpen: boolean,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(
          event.target === buttonRef.current ||
          buttonRef.current?.contains(event.target as Node)
        )
      ) {
        onClickOutside();
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Bind
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef, onClickOutside, isMenuOpen]);
}
