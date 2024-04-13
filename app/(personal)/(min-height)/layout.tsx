export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="content grow max-sm:mt-4">{children}</main>;
}
