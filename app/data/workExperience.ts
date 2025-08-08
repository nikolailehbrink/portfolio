import cimdata from "@/assets/images/logos/cimdata-logo.svg";
import freelance from "@/assets/images/logos/freelance.webp";
import hsb from "@/assets/images/logos/hsb-logo.svg";
import jungundbillig from "@/assets/images/logos/jungundbillig.webp";
import moskito from "@/assets/images/logos/moskito-icon.svg";
import vanever from "@/assets/images/logos/vanever.webp";

export type WorkExperience = {
  description: string;
  endDate: string | null;
  logo: React.ComponentProps<"img">;
  organization: string;
  startDate: string;
  title: string;
  url: string;
};

export const WORK_EXPERIENCE = [
  {
    description: "Full Stack Engineer",
    endDate: null,
    logo: { height: 193, src: vanever, width: 193 },
    organization: "FreeVenture GmbH",
    startDate: "2024-06-08",
    title: "Vanever (prev. Off Campers)",
    url: "https://vanever.com",
  },
  {
    description: "Web Developer & Designer",
    endDate: null,
    logo: { height: 496, src: freelance, width: 496 },
    organization: "Nikolai Lehbrink - Conception, Design and Development",
    startDate: "2021-10-01",
    title: "Freelance Work",
    url: "https://nikolailehbr.ink",
  },
  {
    description: "Web Developer, Full Stack Developer",
    endDate: "2023-08-31",
    logo: { height: 128, src: moskito, width: 128 },
    organization: "moskito GmbH & Co. KG",
    startDate: "2022-01-01",
    title: "moskito",
    url: "https://moskito.de",
  },
  {
    description: "Wordpress Developer, Web Developer, Ecommerce Developer",
    endDate: "2021-05-01",
    logo: { height: 512, src: jungundbillig, width: 512 },
    organization: "Jung&Billig GmbH",
    startDate: "2020-04-01",
    title: "Jung&Billig",
    url: "https://jungundbillig.de",
  },
] satisfies WorkExperience[];

export const EDUCATION = [
  {
    description:
      "Intensive program with practical projects using React, Next.js and TypeScript.",
    endDate: "2024-01-31",
    logo: { height: 256, src: cimdata, width: 256 },
    organization: "cimdata Bildungsakademie",
    startDate: "2023-11-01",
    title: "Specialized Training in React",
    url: "https://www.cimdata.de/",
  },
  {
    description:
      "Application and practice-oriented program with international focus.",
    endDate: "2021-07-31",
    logo: { height: 256, src: hsb, width: 256 },
    organization: "City University of Applied Sciences Bremen",
    startDate: "2017-10-01",
    title: "B.Sc. Media Computer Science",
    url: "https://www.hs-bremen.de/studieren/studiengang/internationaler-studiengang-medieninformatik-b-sc/",
  },
] satisfies WorkExperience[];
