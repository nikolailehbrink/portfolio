import EnvelopeHeart from "@/assets/icons/unicons/envelope-heart.svg";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import MobileAndroid from "@/assets/icons/unicons/mobile-android.svg";
import WhatsApp from "@/assets/icons/unicons/whatsapp.svg";
import AvatarImage from "../AvatarImage";
import ContactForm from "../ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="flex items-center">
      <div className="container grid gap-6 rounded-lg lg:grid-cols-2 lg:gap-12">
        <div
          id="contact-content"
          className="flex flex-col items-start gap-4 self-start"
        >
          <div className="badge badge-orange">
            <CommentCheck />
            Contact
          </div>
          <h2 className="text-5xl font-bold">Your Move!</h2>
          <div>
            <AvatarImage className="float-left mr-4 size-16 rounded-full border-2 border-orange [shape-outside:circle(50%)] lg:size-28" />
            <p className="max-w-[30rem] italic">
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
