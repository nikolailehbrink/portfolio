import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <article className="prose mx-auto my-8 dark:prose-invert">
        {children}
      </article>
    </div>
  );
}
