"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useMenuClickOutside() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(
          event.target === menuButtonRef.current ||
          menuButtonRef.current?.contains(event.target as Node)
        )
      ) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, menuButtonRef, showMenu, setShowMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname, setShowMenu]);

  return { menuRef, menuButtonRef, showMenu, setShowMenu };
}
