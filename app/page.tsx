import Link from "next/link";

export default function Page() {
  return (
    <main>
      <nav>
        <menu>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </menu>
      </nav>
    </main>
  );
}
