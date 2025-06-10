import courseCertificate from "@/assets/images/projects/course-certificate.webp";
import secretMessages from "@/assets/images/projects/secret-messages.jpeg";
import Flowchart from "@/assets/images/projects/flow-chart.webp";
import moskito from "@/assets/images/projects/moskito.webp";

export type Project = {
  title: string;
  description: string;
  image: React.ComponentProps<"img">;
  tags: string[];
  url?: string;
  github?: string;
};

export const PROJECTS = [
  {
    title: "Online course certificate",
    description: "Course certificate for learntypescript.online",
    image: {
      src: courseCertificate,
      height: 1201,
      width: 1600,
    },
    tags: ["Design"],
  },
  {
    title: "Reacts Data Flow",
    description: "Interactive flowchart for react-tutorial.app",
    image: {
      src: Flowchart,
      width: 1898,
      height: 1762,
    },
    tags: ["Design"],
  },
  {
    title: "secretmessag.es",
    description: "Secret message generator",
    image: {
      src: secretMessages,
      width: 1200,
      height: 630,
    },
    url: "https://secretmessag.es",
    tags: ["Web Application", "Design"],
    github: "https://github.com/nikolailehbrink/secret-messages",
  },
  {
    title: "moskito.de",
    description: "Agency website",
    image: {
      src: moskito,
      width: 1200,
      height: 800,
    },
    url: "https://moskito.de",
    tags: ["Website", "Design"],
  },
] as const satisfies Project[];
