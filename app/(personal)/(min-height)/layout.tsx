export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="grow content max-sm:mt-4">{children}</main>;
}
