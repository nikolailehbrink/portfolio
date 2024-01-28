import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  duration: 1,
});

export { gsap, useGSAP, ScrollTrigger };
