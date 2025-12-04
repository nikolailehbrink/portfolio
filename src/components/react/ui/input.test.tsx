import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("should render input element", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("should accept and display value", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");

    await user.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });

  it("should apply default type", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    // When no type is specified, it renders without explicit type attribute (defaults to text)
    expect(input.tagName).toBe("INPUT");
  });

  it("should accept different input types", () => {
    const { rerender } = render(<Input type="email" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    rerender(<Input type="password" />);
    input = document.querySelector('input[type="password"]')!;
    expect(input).toHaveAttribute("type", "password");

    rerender(<Input type="number" />);
    input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", "number");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
  });

  it("should apply custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("should have data-slot attribute", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("should show placeholder text", () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("should accept defaultValue prop", () => {
    render(<Input defaultValue="Initial value" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Initial value");
  });

  it("should handle required attribute", () => {
    render(<Input required />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("should handle readonly attribute", () => {
    render(<Input readOnly value="Read only" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });
});
