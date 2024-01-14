import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <article className="prose prose-neutral mx-auto my-8 dark:prose-invert prose-h1:mb-2">
        {children}
      </article>
    </div>
  );
}
