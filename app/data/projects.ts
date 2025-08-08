import courseCertificate from "@/assets/images/projects/course-certificate.webp";
import Flowchart from "@/assets/images/projects/flow-chart.webp";
import moskito from "@/assets/images/projects/moskito.webp";
import secretMessages from "@/assets/images/projects/secret-messages.webp";

export type Project = {
  description: string;
  github?: string;
  image: React.ComponentProps<"img">;
  tags: string[];
  title: string;
  url?: string;
};

export const PROJECTS = [
  {
    description: "Course certificate for learntypescript.online",
    image: {
      height: 1201,
      src: courseCertificate,
      width: 1600,
    },
    tags: ["Design"],
    title: "Online course certificate",
  },
  {
    description: "Interactive flowchart for react-tutorial.app",
    image: {
      height: 1762,
      src: Flowchart,
      width: 1898,
    },
    tags: ["Design"],
    title: "Reacts Data Flow",
  },
  {
    description: "Secret message generator",
    github: "https://github.com/nikolailehbrink/secret-messages",
    image: {
      height: 630,
      src: secretMessages,
      width: 1200,
    },
    tags: ["Web Application", "Design"],
    title: "secretmessag.es",
    url: "https://secretmessag.es",
  },
  {
    description: "Agency website",
    image: {
      height: 800,
      src: moskito,
      width: 1200,
    },
    tags: ["Website", "Design"],
    title: "moskito.de",
    url: "https://moskito.de",
  },
] as const satisfies Project[];
