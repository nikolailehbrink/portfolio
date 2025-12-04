import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("should render badge with default variant", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Badge className="custom-class">Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toHaveClass("custom-class");
  });

  it("should render with different variants", () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    let badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-primary");

    rerender(<Badge variant="secondary">Secondary</Badge>);
    badge = screen.getByText("Secondary");
    expect(badge).toHaveClass("bg-secondary");

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText("Destructive");
    expect(badge).toHaveClass("bg-destructive");

    rerender(<Badge variant="outline">Outline</Badge>);
    badge = screen.getByText("Outline");
    expect(badge).toHaveClass("text-foreground");
  });

  it("should have data-slot attribute", () => {
    render(<Badge>Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("should render as child component when asChild is true", () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "Link Badge" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should render as span by default", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge.tagName).toBe("SPAN");
  });

  it("should handle children correctly", () => {
    render(
      <Badge>
        <span>Icon</span> Text
      </Badge>,
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText(/Text/)).toBeInTheDocument();
  });
});
