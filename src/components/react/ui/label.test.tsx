import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("should render label with text", () => {
    render(<Label>Username</Label>);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Label className="custom-class">Label</Label>);
    const label = screen.getByText("Label");
    expect(label).toHaveClass("custom-class");
  });

  it("should have data-slot attribute", () => {
    render(<Label>Label</Label>);
    const label = screen.getByText("Label");
    expect(label).toHaveAttribute("data-slot", "label");
  });

  it("should associate with input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>,
    );
    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");
    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("should render children correctly", () => {
    render(
      <Label>
        <span>First Name</span>
        <span className="text-red-500">*</span>
      </Label>,
    );
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("should have default styling classes", () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("flex");
    expect(label).toHaveClass("items-center");
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("font-medium");
  });
});
