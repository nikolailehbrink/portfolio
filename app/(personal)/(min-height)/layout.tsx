export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex grow">{children}</main>;
}
