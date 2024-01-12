import { socialNavigation } from "@/data/Home/SocialNavigation";

export default function SocialNavigation() {
  return (
    <nav className="fixed z-50 flex flex-col gap-2 lg:bottom-4 max-lg:right-2 bottom-2 lg:left-4 ">
      {socialNavigation.map(({ link, icon }) => (
        <a
          key={link}
          className="flex items-center p-2 bg-neutral-50 opacity-80 hover:opacity-100 transition-opacity rounded-full text-neutral-950"
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
