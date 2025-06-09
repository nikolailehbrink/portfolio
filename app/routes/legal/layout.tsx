import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export const meta: Route.MetaFunction = () => {
  return [
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ];
};

export default function Layout() {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <Outlet />
    </article>
  );
}
