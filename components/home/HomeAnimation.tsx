"use client";

import type { ReactNode } from "react";
import { twConfig } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";

export default function HomeAnimation({ children }: { children: ReactNode }) {
  useGSAP(() => {
    gsap.to("section#header #gradient-blur", {
      rotate: 270,
      scrollTrigger: {
        start: "top top",
        scrub: 2,
        trigger: "section#header",
      },
    });

    gsap.from("section#passion .service-box", {
      autoAlpha: 0,
      stagger: 0.5,
      y: twConfig.theme.spacing[32],
      scrollTrigger: {
        start: "top bottom",
        end: "bottom 75%",
        scrub: 2,
        trigger: "section#passion .container .grid",
        toggleActions: "restart none none none",
      },
    });

    gsap.from(".service-content > *", {
      autoAlpha: 0,
      stagger: 0.2,
      x: twConfig.theme.spacing[4],
      scrollTrigger: {
        start: "top bottom",
        end: "bottom bottom",
        scrub: 2,
        trigger: "section#passion .service-content",
        toggleActions: "restart none none none",
        // markers: true,
      },
    });

    gsap.from("#project-content > *", {
      autoAlpha: 0,
      stagger: 0.2,
      y: twConfig.theme.spacing[4],
      scrollTrigger: {
        start: "top bottom",
        end: "bottom bottom",
        scrub: 2,
        // markers: true,
        trigger: "section#projects",
        toggleActions: "restart none none none",
      },
    });

    gsap.from("#projects .carousel-item", {
      autoAlpha: 0,
      stagger: 0.5,
      x: 50,
      scrollTrigger: {
        start: "top center",
        end: "bottom bottom",
        trigger: "section#projects",
        // markers: true,
        scrub: 3,
        toggleActions: "play none reverse restart",
      },
    });

    gsap.from("#expertise-grid svg", {
      fill: "#FFF",
      fillOpacity: 0.3,
      backgroundImage: "none",
      stagger: 0.5,
      duration: 0.5,
      scrollTrigger: {
        scrub: true,
        trigger: "#expertise-grid",
        end: "bottom 15%",
        start: "top 85%",
        toggleActions: "restart none restart none",
      },
    });

    document.querySelectorAll("#work-places li").forEach((listElement) => {
      const logo = listElement.querySelector(".sticky")!;
      const topValue = getComputedStyle(logo).getPropertyValue("top") ?? 0;
      gsap.to(logo, {
        borderColor: "#FFF",
        duration: 0.2,
        backgroundColor: twConfig.theme.colors.orange.DEFAULT,
        scrollTrigger: {
          start: "top " + topValue,
          end: "bottom " + topValue,
          trigger: listElement,
          toggleActions: "play reverse restart reverse",
          // markers: true,
        },
      });
      gsap.from(listElement, {
        autoAlpha: 0,
        duration: 0.5,
        y: twConfig.theme.spacing[8],
        scrollTrigger: {
          start: "top 90%",
          end: "bottom 25%",
          trigger: listElement,
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });
    });
    gsap.from("#experience-content", {
      autoAlpha: 0,
      y: twConfig.theme.spacing[8],
      scrollTrigger: {
        start: "top 80%",
        end: "bottom 25%",
        trigger: "section#experience",
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });
    gsap.from("#contact-content", {
      autoAlpha: 0,
      y: twConfig.theme.spacing[16],
      scrollTrigger: {
        start: "10% 80%",
        end: "bottom 25%",
        trigger: "section#contact",
        toggleActions: "play none none reverse",
        // markers: trXue,
      },
    });
    gsap.from("#contact-form", {
      autoAlpha: 0.5,
      // backgroundColor: twConfig.theme.colors.neutral[800],
      y: `-${twConfig.theme.spacing[16]}`,
      scale: 0.3,
      transformOrigin: "bottom left",
      scrollTrigger: {
        start: "top bottom",
        end: "25% center",
        trigger: "section#contact",
        toggleActions: "play reverse restart reverse",
        scrub: 1,
        // markers: true,
      },
    });
  });

  return <>{children}</>;
}
