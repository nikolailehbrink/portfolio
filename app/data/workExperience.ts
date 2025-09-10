import vanever from "@/assets/images/logos/vanever.svg";
import moskito from "@/assets/images/logos/moskito.svg";
import jungundbillig from "@/assets/images/logos/jungundbillig.svg";
import freelance from "@/assets/images/logos/freelance.svg";
import hsb from "@/assets/images/logos/hsb.svg";
import cimdata from "@/assets/images/logos/cimdata.svg";

export type WorkExperience = {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  logo: React.ComponentProps<"img">;
  organization: string;
  url: string;
};

export const WORK_EXPERIENCE = [
  {
    title: "Vanever (prev. Off Campers)",
    description: "Full Stack Engineer",
    startDate: "2024-06-08",
    endDate: null,
    logo: { src: vanever, width: 193, height: 193 },
    organization: "FreeVenture GmbH",
    url: "https://vanever.com",
  },
  {
    title: "Freelance Work",
    description: "Web Developer & Designer",
    startDate: "2021-10-01",
    endDate: null,
    logo: { src: freelance, width: 496, height: 496 },
    organization: "Nikolai Lehbrink - Conception, Design and Development",
    url: "https://nikolailehbr.ink",
  },
  {
    title: "moskito",
    description: "Web Developer, Full Stack Developer",
    startDate: "2022-01-01",
    endDate: "2023-08-31",
    logo: { src: moskito, width: 128, height: 128 },
    organization: "moskito GmbH & Co. KG",
    url: "https://moskito.de",
  },
  {
    title: "Jung&Billig",
    description: "Wordpress Developer, Web Developer, Ecommerce Developer",
    startDate: "2020-04-01",
    endDate: "2021-05-01",
    logo: { src: jungundbillig, width: 512, height: 512 },
    organization: "Jung&Billig GmbH",
    url: "https://jungundbillig.de",
  },
] satisfies WorkExperience[];

export const EDUCATION = [
  {
    title: "Specialized Training in React",
    description:
      "Intensive program with practical projects using React, Next.js and TypeScript.",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    logo: { src: cimdata, width: 256, height: 256 },
    organization: "cimdata Bildungsakademie",
    url: "https://www.cimdata.de/",
  },
  {
    title: "B.Sc. Media Computer Science",
    description:
      "Application and practice-oriented program with international focus.",
    startDate: "2017-10-01",
    endDate: "2021-07-31",
    logo: { src: hsb, width: 256, height: 256 },
    organization: "City University of Applied Sciences Bremen",
    url: "https://www.hs-bremen.de/studieren/studiengang/internationaler-studiengang-medieninformatik-b-sc/",
  },
] satisfies WorkExperience[];
