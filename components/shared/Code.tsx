type Props = { children: React.ReactNode };
export default function Code({ children }: Props) {
  return (
    <code
      className="not-prose rounded-md border border-neutral-700 bg-neutral-800
        px-[3px] py-[2px] text-sm"
    >
      {children}
    </code>
  );
}
