export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="grow content">{children}</main>;
}
