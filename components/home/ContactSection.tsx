import EnvelopeHeart from "@/public/icons/envelope-heart.svg";
import CommentCheck from "@/public/icons/comment-check.svg";
import MobileAndroid from "@/public/icons/mobile-android.svg";
import WhatsApp from "@/public/icons/whatsapp.svg";
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
            Kontakt
          </div>
          <h2 className="text-5xl font-bold">Lets get in touch!</h2>
          <div>
            <AvatarImage className="float-left mr-4 size-16 rounded-full border-2 border-orange [shape-outside:circle(50%)] lg:size-28" />
            <p className="max-w-[30rem] italic">
              „Hi, and welcome to my website. After some revisions and
              experimenting with various designs over the years, I&apos;m quite
              proud of the final outcome. If you have any comments or just want
              to say &apos;hello&apos;, feel free to contact me!“
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
