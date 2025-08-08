import { parseWithZod } from "@conform-to/zod/v4";
import {
  ArticleNyTimesIcon,
  KanbanIcon,
  MailboxIcon,
  ProjectorScreenChartIcon,
  StudentIcon,
  TextColumnsIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router";

import Avatar from "@/components/Avatar";
import ContactForm, {
  schema as contactFormSchema,
} from "@/components/ContactForm";
import ExperienceCard from "@/components/ExperienceCard";
import NewsletterForm from "@/components/NewsletterForm";
import PostTeaser from "@/components/PostTeaser";
import ProjectTeaser from "@/components/ProjectTeaser";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { EDUCATION, WORK_EXPERIENCE } from "@/data/workExperience";
import { getPosts } from "@/lib/posts.server";
import { resend } from "@/lib/resend.server";
import { cn } from "@/lib/utils";

import type { Route } from "./+types";

export async function loader() {
  const posts = await getPosts({ take: 2 });
  return { posts };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: contactFormSchema });

  // Report the submission to client if it is not successful
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, message, name, phone, subject } = submission.value;

  const { error } = await resend.emails.send({
    from: "Kontaktformular <contact-form@nikolailehbr.ink>",
    html: `
        ${name && `<p>Name: ${name}</p>`}
        ${phone && `<p>Phone: ${phone}</p>`}
        <p>Message: ${message}</p>
    `,
    replyTo: email,
    subject: subject ?? "New inquiry",
    tags: [
      {
        name: "category",
        value: "contact_form",
      },
    ],
    text: `
        ${name && `Name: ${name}\n`}
        ${phone && `Phone: ${phone}\n`}
        Message: ${message}
    `,
    to: [
      import.meta.env.DEV ? "delivered@resend.dev" : "mail@nikolailehbr.ink",
    ],
  });

  if (error) {
    console.error(error);
    return submission.reply({
      formErrors: ["Failed to send the message. Please try again later."],
    });
  }

  return {
    //https://github.com/edmundhung/conform/issues/410
    ...submission.reply(),
    ...submission.reply({
      resetForm: true,
    }),
  };
}

export default function Home({ loaderData: { posts } }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-start gap-8 sm:items-center sm:gap-16">
      <div
        className="relative flex animate-in items-center justify-center
          duration-1000 fade-in-50 zoom-in-75"
      >
        <div
          className="absolute -inset-px animate-in rounded-2xl bg-linear-to-br
            from-amber-600 via-sky-600 to-sky-400 opacity-75 blur-2xl
            duration-[2s] zoom-in-80"
        ></div>
        <div
          className="absolute -inset-0.5 rounded-2xl bg-linear-to-br
            from-amber-600 via-sky-600 to-sky-400"
        ></div>
        <Avatar className="relative size-24 rounded-xl sm:size-40" />
      </div>
      <div className="z-10 space-y-6 fade-in sm:text-center">
        <h1
          className="animate-in text-4xl font-bold tracking-tight duration-1000
            slide-in-from-bottom-40 sm:zoom-in-80"
        >
          Nikolai Lehbrink
        </h1>
        <p
          className="max-w-prose animate-in text-pretty text-white/70
            duration-1000 slide-in-from-bottom-30 fade-in sm:text-lg
            sm:slide-in-from-bottom-40"
        >
          I am a <b className="text-white">Full Stack Developer</b> and mostly{" "}
          <b className="text-white">Frontend Engineer</b> with a passion for
          building web applications based in Munich. I enjoy learning new things
          and sharing my knowledge with others.
        </p>
      </div>
      <div
        className="relative animate-in duration-1000 slide-in-from-bottom-5
          sm:slide-in-from-top-5"
      >
        <div
          className="absolute -top-1/12 left-1/5 h-80 w-40 rotate-45 animate-in
            bg-neutral-500/40 blur-2xl duration-[2.5s] fade-in"
        ></div>
        <div
          className="absolute -top-12 left-2/5 h-50 w-24 rotate-45 animate-in
            bg-neutral-500/50 blur-3xl duration-[3s] fade-in lg:-top-1/5
            lg:left-2/5 lg:h-96 lg:w-36"
        ></div>
        <div
          className="relative grid grid-cols-1 gap-8 rounded-3xl border-t
            bg-linear-to-b from-neutral-900/90 to-neutral-950/50 p-4 py-6
            max-sm:-mx-4 sm:grid-cols-2 sm:p-8 lg:grid-cols-3"
        >
          <div
            className="absolute -top-px left-1/4 h-px w-1/3 animate-in
              bg-linear-to-r from-transparent via-white/60 to-transparent
              duration-[2s] slide-in-from-left-100 fade-in-40"
          ></div>
          <div className="flex flex-col gap-2 sm:row-span-2">
            <h2 className="flex items-center gap-1 text-2xl font-bold">
              <ProjectorScreenChartIcon size={28} weight="duotone" />
              Projects
            </h2>
            <p className="max-w-prose text-muted-foreground">
              Here are some of the projects I have worked on. This is a growing
              list of my work, showcasing my skills and interests in web
              development and design.
            </p>
          </div>
          {/* TODO: Add animation to this element */}
          <div
            className="order-last animate-pulse rounded-lg bg-neutral-900 p-4
              text-center text-muted-foreground offset-border"
          >
            More projects are listed here soon!
          </div>

          {PROJECTS.map((project, index) => (
            <ProjectTeaser
              className={cn(
                "animate-in duration-700 fade-in-50 sm:slide-in-from-bottom-25",
                index % 2 === 0
                  ? "sm:duration-1000 sm:slide-in-from-bottom-35"
                  : "",
              )}
              key={project.title}
              {...project}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-1 text-2xl font-bold">
            <ArticleNyTimesIcon size={28} weight="duotone" />
            Blog
          </h2>
          <p className="mb-3 max-w-prose text-muted-foreground">
            A collection of my thoughts, ideas, and experiences. I write about
            various topics, including web development, technology, and personal
            topics.
          </p>
          {posts.length > 0 ? (
            <div className="relative">
              <ul className="flex flex-col gap-4">
                {posts.map((post) => (
                  <PostTeaser key={post.slug} {...post}></PostTeaser>
                ))}
              </ul>
              <div
                className="absolute -inset-x-[3px] -bottom-[3px] z-30 flex
                  justify-center rounded-xl bg-linear-to-b from-transparent
                  to-background pt-12 pb-4"
              >
                <Button asChild>
                  <Link to="/blog">
                    <TextColumnsIcon size={24} weight="duotone" />
                    View all posts
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}
          <NewsletterForm showText={false} />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2 className="flex items-center gap-1 text-2xl font-bold">
            <KanbanIcon size={28} weight="duotone" />
            Skills
          </h2>
          <p className="mb-3 max-w-prose text-muted-foreground">
            I have a diverse skill set that includes frontend and backend
            development, design, and project management. I am always eager to
            learn new technologies and improve my skills. Here are some that I
            have acquired over the years.
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(SKILLS).map(([category, skillSet]) => {
              return (
                <div
                  className="flex flex-col gap-1 overflow-x-hidden rounded-lg
                    border bg-background shadow-md offset-border"
                  key={category}
                >
                  <ul
                    className="relative flex snap-x snap-mandatory gap-4
                      overflow-x-auto border-b bg-neutral-900 p-4 shadow"
                  >
                    {skillSet.map(({ logo: Logo, name, url }) => (
                      <li className="snap-start scroll-mx-4" key={name}>
                        <Link
                          className="flex flex-col items-center gap-2 text-xs
                            whitespace-nowrap text-muted-foreground
                            grayscale-100 transition-[filter_color] duration-300
                            hover:text-foreground hover:grayscale-0"
                          rel="noopener noreferrer"
                          target="_blank"
                          to={url}
                        >
                          <Logo className="size-8 rounded" />
                          <span>{name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <h3
                    className="py-0.5 pb-1.5 text-center text-sm
                      text-muted-foreground"
                  >
                    {category}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-1 text-2xl font-bold">
            <StudentIcon size={28} weight="duotone" />
            Work and Education
          </h2>
          <p className="mb-3 max-w-prose text-muted-foreground">
            I have worked in various roles and companies, gaining experience in
            web development, design, and project management. Here are some of my
            work experiences and educational background.
          </p>
          <div className="flex flex-col gap-4">
            {WORK_EXPERIENCE.map((experience) => {
              return <ExperienceCard key={experience.url} {...experience} />;
            })}
            {EDUCATION.map((experience) => {
              return <ExperienceCard key={experience.url} {...experience} />;
            })}
          </div>
        </div>
      </div>
      <section className="@container flex w-full flex-col gap-2 lg:max-w-3xl">
        <h2 className="flex items-center gap-1 text-2xl font-bold">
          <MailboxIcon size={28} weight="duotone" />
          Contact
        </h2>
        <p className="mb-3 max-w-prose text-muted-foreground">
          Whether you have a question, want to collaborate on a project, or just
          want to say hello, feel free to reach out using the form below. I will
          get back to you as soon as possible.
        </p>
        <ContactForm />
      </section>
    </div>
  );
}
