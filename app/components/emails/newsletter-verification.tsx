import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

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
    <Html dir="ltr" lang="en">
      <Tailwind>
        <Head />
        <Preview>
          Please confirm your email to complete your newsletter subscription
        </Preview>
        <Body className="bg-neutral-950 font-sans text-neutral-300">
          <Container
            className="mx-auto max-w-[600px] rounded-[8px] bg-neutral-900
              p-[40px] shadow-sm"
          >
            <Section>
              <Text className="mb-[24px] text-[16px] leading-[24px]">
                Hi there,
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px]">
                Thanks for signing up for my newsletter. To complete your
                subscription, please confirm your email address by clicking the
                button below:
              </Text>

              <Section className="mb-[24px]">
                <Button
                  className="rounded-lg bg-sky-950 px-5 py-3 text-center
                    text-[14px] font-semibold text-sky-400 no-underline
                    hover:bg-sky-600 hover:text-sky-50"
                  href={confirmationLink}
                >
                  Confirm Email
                </Button>
              </Section>

              <Text
                className="mb-[12px] text-[14px] leading-[20px]
                  text-neutral-400"
              >
                If the button above doesn’t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text
                className="mb-[12px] text-[14px] leading-[20px] text-sky-600"
                style={{
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  wordWrap: "break-word",
                }}
              >
                {confirmationLink}
              </Text>

              <Text
                className="mb-[12px] text-[14px] leading-[20px]
                  text-neutral-400"
              >
                This link will expire in 24 hours. If you didn’t request this
                subscription, you can ignore this message.
              </Text>

              <Text
                className="mb-[8px] text-[16px] leading-[24px] text-neutral-300"
              >
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
