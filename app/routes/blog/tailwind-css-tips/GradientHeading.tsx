export default function GradientHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-xl bg-neutral-900 p-4
        offset-border"
    >
      <span
        className="inline-block rounded-xl bg-gradient-to-b from-neutral-500
          to-neutral-300 bg-clip-text text-3xl font-bold text-transparent"
      >
        {children}
      </span>
    </div>
  );
}
