"use client";

import ListOlAlt from "@/assets/icons/unicons/list-ol-alt.svg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { HeadingBlock } from "@/types/sanity";
import { useState } from "react";
import TableOfContents from "./TableOfContents";

export default function ToCSheet({ headings }: { headings: HeadingBlock[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        asChild
        size="icon"
        className="fixed bottom-4 right-4 size-11 xl:hidden"
      >
        <SheetTrigger>
          <ListOlAlt className="w-5" />
        </SheetTrigger>
      </Button>
      <SheetContent
        className="flex max-h-screen flex-col gap-2 overflow-auto p-8"
      >
        <TableOfContents
          headings={headings}
          afterLinkClick={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
