import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("should render textarea element", () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText("Enter text");
    expect(textarea).toBeInTheDocument();
  });

  it("should accept and display value", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText("Type here");

    await user.type(textarea, "Hello World");
    expect(textarea).toHaveValue("Hello World");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    const textarea = screen.getByPlaceholderText("Disabled textarea");
    expect(textarea).toBeDisabled();
  });

  it("should apply custom className", () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });

  it("should have data-slot attribute", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });

  it("should show placeholder text", () => {
    render(<Textarea placeholder="Enter your message" />);
    expect(
      screen.getByPlaceholderText("Enter your message"),
    ).toBeInTheDocument();
  });

  it("should accept defaultValue prop", () => {
    render(<Textarea defaultValue="Initial value" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Initial value");
  });

  it("should handle required attribute", () => {
    render(<Textarea required />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeRequired();
  });

  it("should handle readonly attribute", () => {
    render(<Textarea readOnly value="Read only" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
  });

  it("should handle rows attribute", () => {
    render(<Textarea rows={5} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("should handle multiline input", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Multi-line" />);
    const textarea = screen.getByPlaceholderText("Multi-line");

    await user.type(textarea, "Line 1{enter}Line 2{enter}Line 3");
    expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
  });
});
