import { Button } from "@/components/react/ui/button";

export default function ExampleMessage({
  setInput,
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="border border-border bg-muted hover:text-foreground
        sm:text-muted-foreground"
      onClick={() => setInput(message)}
    >
      {children}
    </Button>
  );
}
