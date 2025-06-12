import { Outlet } from "react-router";

export default function Layout() {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <Outlet />
    </article>
  );
}
