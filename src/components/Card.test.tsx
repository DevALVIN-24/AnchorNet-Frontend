import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>Inner content</p>
      </Card>,
    );
    expect(screen.getByText("Inner content")).toBeInTheDocument();
  });

  it("appends a custom className to the default styles", () => {
    render(<Card className="extra-class">content</Card>);
    expect(screen.getByText("content")).toHaveClass("extra-class");
    expect(screen.getByText("content")).toHaveClass("rounded-xl");
  });
});
