import footerNavigation from "@/data/Home/FooterNavigation";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="colophon"
      className="site-footer bg-neutral-950 py-6"
      role="contentinfo"
    >
      <div className="container flex justify-between max-lg:flex-col">
        <span>
          &copy; {new Date().getFullYear()} | Nikolai Lehbrink - Web Development
          & Design
        </span>
        {footerNavigation.length > 0 && (
          <menu className="flex gap-2">
            {footerNavigation.map((item, index) => (
              <li key={item.link}>
                <Link
                  className="hover:underline hover:underline-offset-2"
                  href={item.link}
                >
                  {item.name}
                </Link>
                {index < footerNavigation.length - 1 && (
                  <span className="ml-2">|</span>
                )}
              </li>
            ))}
          </menu>
        )}
      </div>
    </footer>
  );
}
