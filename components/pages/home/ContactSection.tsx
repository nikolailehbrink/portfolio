"use client";
import { useRef } from "react";

import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import EnvelopeHeart from "@/assets/icons/unicons/envelope-heart.svg";
import MobileAndroid from "@/assets/icons/unicons/mobile-android.svg";
import WhatsApp from "@/assets/icons/unicons/whatsapp.svg";
import ContactForm from "@/components/pages/home/ContactForm";
import ProfileImage from "@/components/shared/ProfileImage";
import { gsap, useGSAP } from "@/lib/gsap";
import { tailwindConfig } from "@/tailwind.config";

export default function ContactSection() {
  const otherRef = useRef(null);
  const q = gsap.utils.selector(otherRef);

  useGSAP(
    () => {
      gsap.from(q("#contact-content > *"), {
        autoAlpha: 0,
        y: tailwindConfig.theme.spacing[16],
        stagger: 0.2,
        scrollTrigger: {
          end: "center 60%",
          start: "top 85%",
          scrub: 1,
          trigger: otherRef.current,
          toggleActions: "restart none restart none",
        },
      });
      gsap.from(q("#contact-form"), {
        autoAlpha: 0.4,
        y: `-${tailwindConfig.theme.spacing[16]}`,
        scale: 0.2,
        transformOrigin: "top",
        scrollTrigger: {
          start: "top bottom",
          end: "40% 60%",
          trigger: otherRef.current,
          toggleActions: "play reverse restart reverse",
          scrub: 1,
        },
      });
    },
    { scope: otherRef }
  );

  return (
    <section ref={otherRef} id="contact" className="flex items-center">
      <div className="container grid gap-6 rounded-lg lg:grid-cols-2 lg:gap-12">
        <div
          id="contact-content"
          className="flex flex-col items-start gap-4 self-start prose dark:prose-invert prose-neutral"
        >
          <div className="badge badge-sky">
            <CommentCheck />
            Contact
          </div>
          <h2 className="text-5xl font-bold my-0">Your Move!</h2>
          <div>
            <ProfileImage className="float-left mr-4 size-16 rounded-full border-2 border-orange [shape-outside:circle(50%)] lg:size-28" />
            <p className="max-w-[30rem] italic my-0 leading-normal">
              &ldquo;Well... Not everybody makes it to the bottom of the page,
              but you are one of them! So why don&apos;t say hello and have a
              chat about anything you are interested in? I would also greatly
              aprreciate feedback on the site or just a friendly conversation.
              Looking forward!&rdquo; - Nikolai
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Telefon</h2>
            <div className="flex items-center justify-center gap-2">
              <WhatsApp className="size-7" />
              <a href="https://wa.me/message/W26MWW6VUYEFD1">
                +49 (0) 179 4393782
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MobileAndroid className="size-7" />
              <a href="tel:+491794393782">+49 (0) 179 4393782</a>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">E-Mail</h2>
            <div className="flex items-center justify-center gap-2">
              <EnvelopeHeart className="size-7" />
              <a href="mailto:mail@nikolailehbr.ink">mail@nikolailehbr.ink</a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
