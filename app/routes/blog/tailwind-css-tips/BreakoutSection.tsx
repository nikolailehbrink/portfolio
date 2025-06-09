export default function BreakoutSection() {
  return (
    <section
      className="not-prose grid overflow-hidden rounded-xl bg-sky-950
        text-sky-300 offset-border md:-mx-16 md:grid-cols-[1fr_auto_1fr]
        lg:-mx-32 2xl:-mx-48"
    >
      <div
        className="flex items-center justify-center bg-pattern-15 p-2
          text-center font-mono text-xs max-md:hidden"
      >
        <span className="hidden md:max-lg:inline-block">md:-mx-16</span>
        <span className="hidden lg:max-xl:inline-block">lg:-mx-32</span>
        <span className="hidden 2xl:inline-block">2xl:-mx-48</span>
      </div>
      <div className="flex max-w-prose flex-col gap-2 px-4 py-6">
        <p className="text-2xl font-bold text-sky-100">
          This is a breakout section
        </p>
        <p className="self-center">
          On screens wider than 768px, this section appears broader than the
          other content. Use it to draw attention to key information or
          introduce a visual break in your layout.
        </p>
      </div>
      <div
        className="flex items-center justify-center bg-pattern-15 p-2
          text-center font-mono text-xs max-md:hidden"
      >
        <span className="hidden md:max-lg:inline-block">md:-mx-16</span>
        <span className="hidden lg:max-xl:inline-block">lg:-mx-32</span>
        <span className="hidden 2xl:inline-block">2xl:-mx-48</span>
      </div>
    </section>
  );
}
