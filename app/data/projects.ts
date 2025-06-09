import courseCertificate from "@/assets/images/projects/course-certificate.webp";
import secretMessages from "@/assets/images/projects/secret-messages.jpeg";
import Flowchart from "@/assets/images/projects/flow-chart.webp";
import moskito from "@/assets/images/projects/moskito.webp";

export const PROJECTS = [
  {
    title: "Online course certificate",
    description: "Course certificate for learntypescript.online",
    image: courseCertificate,
    tags: ["Design"],
  },
  {
    title: "Reacts Data Flow",
    description: "Interactive flowchart for react-tutorial.app",
    image: Flowchart,
    tags: ["Design"],
  },
  {
    title: "secretmessag.es",
    description: "Secret message generator",
    image: secretMessages,
    url: "https://secretmessag.es",
    tags: ["Web Application", "Design"],
    github: "https://github.com/nikolailehbrink/secret-messages",
  },
  {
    title: "moskito.de",
    description: "Agency website",
    image: moskito,
    url: "https://moskito.de",
    tags: ["Website", "Design"],
  },
];
