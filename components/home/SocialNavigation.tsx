import { socialNavigation } from "@/data/Home/SocialNavigation";

export default function SocialNavigation() {
  return (
    <nav className="fixed bottom-2 z-50 flex flex-col gap-2 max-lg:right-2 lg:bottom-4 lg:left-4">
      {socialNavigation.map(({ link, icon }) => (
        <a
          key={link}
          className="flex items-center rounded-full bg-neutral-50 p-2 text-neutral-950 opacity-80 transition-opacity hover:opacity-100"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon}
        </a>
      ))}
    </nav>
  );
}
