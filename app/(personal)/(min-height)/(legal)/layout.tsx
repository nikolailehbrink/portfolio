import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <section className="prose lg:prose-lg prose-neutral mx-auto my-4 dark:prose-invert prose-h1:mb-2">
        {children}
      </section>
    </div>
  );
}
