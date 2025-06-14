import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

type NewsletterVerificationProps = {
  confirmationLink: string;
  email: string;
};

export function PlainText({
  email = "there",
  confirmationLink,
}: NewsletterVerificationProps) {
  return `Welcome to my Newsletter! 🗞️
Hi ${email},
Thank you for subscribing to my newsletter! I am excited to have you join my community and share valuable insights, updates, and exclusive content with you.
To complete your subscription and start receiving my newsletter, please verify your email address by clicking the link below:
${confirmationLink}
Note: This verification link will expire in 24 hours for security reasons. If you didn't subscribe to my newsletter, you can safely ignore this email.
Best regards,
Nikolai Lehbrink`;
}

const NewsletterVerificationEmail = ({
  email = "there",
  confirmationLink,
}: NewsletterVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Please verify your email address to complete ymy newsletter
          subscription
        </Preview>
        <Body className="bg-neutral-950 font-sans text-neutral-300">
          <Container
            className="mx-auto max-w-[600px] rounded-[8px] bg-neutral-900
              p-[40px] shadow-sm"
          >
            <Section>
              <Heading
                className="mb-[24px] text-[32px] font-bold text-neutral-100"
              >
                Welcome to my Newsletter! 🗞️
              </Heading>

              <Text className="mb-[24px] text-[16px] leading-[24px]">
                Hi <span className="font-semibold text-sky-500">{email}</span>,
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px]">
                Thank you for subscribing to my newsletter! I am excited to have
                you join my community and share valuable insights, updates, and
                exclusive content with you.
              </Text>

              <Text className="mb-[32px] text-[16px] leading-[24px]">
                To complete your subscription and start receiving my newsletter,
                please verify your email address by clicking the button below:
              </Text>

              <Section className="mb-[24px]">
                <Button
                  href={confirmationLink}
                  className="rounded-lg bg-sky-950 px-5 py-3 text-center
                    text-[14px] font-semibold text-sky-400 no-underline
                    hover:bg-sky-600 hover:text-sky-50"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text
                className="mb-[12px] text-[14px] leading-[20px]
                  text-neutral-400"
              >
                If the button above doesn&apos;t work, you can also copy and
                paste this link into your browser:
              </Text>

              <Text
                className="mb-[12px] text-[14px] leading-[20px] break-all
                  text-sky-600"
              >
                {confirmationLink}
              </Text>

              <Text
                className="mb-[12px] text-[14px] leading-[20px]
                  text-neutral-400"
              >
                Note: This verification link will expire in 24 hours for
                security reasons. If you didn&apos;t subscribe to our
                newsletter, you can safely ignore this email.
              </Text>

              <Text
                className="mb-[8px] text-[16px] leading-[24px] text-neutral-300"
              >
                Best regards,
                <br />
                Nikolai Lehbrink
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewsletterVerificationEmail.PreviewProps = {
  email: "john.doe@example.com",
  confirmationLink:
    "https://nikolailehbr.ink/newsletter/verification?token=abc123xyz789asdjpasd.asdjaspdfgsgpisdf.asdjaspidaspf",
} satisfies NewsletterVerificationProps;

export default NewsletterVerificationEmail;
