import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "react-email";

type NewsletterVerificationProps = {
  confirmationLink: string;
};

export function PlainText({ confirmationLink }: NewsletterVerificationProps) {
  return `Hi there,
Thanks for signing up for my newsletter.
Please confirm your subscription by clicking the link below:
${confirmationLink}
This link expires in 24 hours. If you didn’t request this, you can ignore this email.
— Nikolai Lehbrink`;
}

const NewsletterVerificationEmail = ({
  confirmationLink,
}: NewsletterVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Please confirm your email to complete your newsletter subscription
        </Preview>
        <Body className="bg-neutral-950 font-sans text-neutral-300">
          <Container
            className="mx-auto max-w-150 rounded-xl bg-neutral-900 p-10
              shadow-sm"
          >
            <Section>
              <Text className="mb-6 text-[16px] leading-6">Hi there,</Text>

              <Text className="mb-6 text-[16px] leading-6">
                Thanks for signing up for my newsletter. To complete your
                subscription, please confirm your email address by clicking the
                button below:
              </Text>

              <Section className="mb-6">
                <Button
                  href={confirmationLink}
                  className="rounded-lg bg-sky-950 px-5 py-3 text-center
                    text-[14px] font-semibold text-sky-400 no-underline
                    hover:bg-sky-600 hover:text-sky-50"
                >
                  Confirm Email
                </Button>
              </Section>

              <Text className="mb-3 text-[14px] leading-5 text-neutral-400">
                If the button above doesn’t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text
                className="mb-3 text-[14px] leading-5 text-sky-600"
                style={{
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }}
              >
                {confirmationLink}
              </Text>

              <Text className="mb-3 text-[14px] leading-5 text-neutral-400">
                This link will expire in 24 hours. If you didn’t request this
                subscription, you can ignore this message.
              </Text>

              <Text className="mb-2 text-[16px] leading-6 text-neutral-300">
                — Nikolai Lehbrink
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewsletterVerificationEmail.PreviewProps = {
  confirmationLink:
    "https://nikolailehbr.ink/newsletter/verification?token=abc123xyz789asdjpasd.asdjaspdfgsgpisdf.asdjaspidaspf",
} satisfies NewsletterVerificationProps;

export default NewsletterVerificationEmail;
