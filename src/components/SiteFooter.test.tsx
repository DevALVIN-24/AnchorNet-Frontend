import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders the footer tagline", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(/liquidity coordination for Stellar anchors/i),
    ).toBeInTheDocument();
  });
});
