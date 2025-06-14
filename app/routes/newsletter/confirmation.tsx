import type { Route } from "./+types/confirmation";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const alreadySubscribed = searchParams.has("alreadySubscribed");
  return {
    alreadySubscribed,
  };
}

export default function NewsletterConfirmation({
  loaderData: { alreadySubscribed },
}: Route.ComponentProps) {
  return (
    <div
      className="-mt-24 flex max-w-prose flex-col gap-2 self-center rounded-lg
        bg-neutral-900 p-4 offset-border"
    >
      <h1 className="text-xl font-bold">
        {alreadySubscribed
          ? "You are already subscribed to the newsletter!"
          : "Thank you for subscribing to the newsletter!"}
      </h1>
      <p className="text-muted-foreground">
        I promise to only send you relevant updates and content about once a
        month. If you ever change your mind, you can unsubscribe at any time
        from each email.
      </p>
    </div>
  );
}
