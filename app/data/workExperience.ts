import vanever from "@/assets/images/logos/vanever.png";
import moskito from "@/assets/images/logos/moskito-icon.svg";
import jungundbillig from "@/assets/images/logos/jungundbillig.png";
import freelance from "@/assets/images/logos/freelance.png";
import hsb from "@/assets/images/logos/hsb-logo.svg";
import cimdata from "@/assets/images/logos/cimdata-logo.svg";
import type { Experience } from "@/components/ExperienceCard";

export const WORK_EXPERIENCE = [
  {
    title: "Vanever (prev. Off Campers)",
    description: "Full Stack Engineer",
    startDate: "2024-06-08",
    endDate: null,
    logo: vanever,
    organization: "FreeVenture GmbH",
    url: "https://vanever.com",
  },
  {
    title: "Freelance Work",
    description: "Web Developer & Designer",
    startDate: "2021-10-01",
    endDate: null,
    logo: freelance,
    organization: "Nikolai Lehbrink - Conception, Design and Development",
    url: "https://nikolailehbr.ink",
  },
  {
    title: "moskito",
    description: "Web Developer, Full Stack Developer",
    startDate: "2022-01-01",
    endDate: "2023-08-31",
    logo: moskito,
    organization: "moskito GmbH & Co. KG",
    url: "https://moskito.de",
  },
  {
    title: "Jung&Billig",
    description: "Wordpress Developer, Web Developer, Ecommerce Developer",
    startDate: "2020-04-01",
    endDate: "2021-05-01",
    logo: jungundbillig,
    organization: "Jung&Billig GmbH",
    url: "https://jungundbillig.de",
  },
] satisfies Experience[];

export const EDUCATION = [
  {
    title: "Specialized Training in React",
    description:
      "Intensive program with practical projects using React, Next.js and TypeScript.",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    logo: cimdata,
    organization: "cimdata Bildungsakademie",
    url: "https://www.cimdata.de/",
  },
  {
    title: "B.Sc. Media Computer Science",
    description:
      "Application and practice-oriented program with international focus.",
    startDate: "2017-10-01",
    endDate: "2021-07-31",
    logo: hsb,
    organization: "City University of Applied Sciences Bremen",
    url: "https://www.hs-bremen.de/studieren/studiengang/internationaler-studiengang-medieninformatik-b-sc/",
  },
] satisfies Experience[];
