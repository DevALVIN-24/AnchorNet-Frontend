import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";
import { WalletProvider } from "./WalletProvider";

describe("SiteHeader", () => {
  it("renders the primary navigation links", () => {
    render(
      <WalletProvider>
        <SiteHeader />
      </WalletProvider>,
    );

    expect(screen.getByRole("link", { name: "AnchorNet" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "Anchors" })).toHaveAttribute(
      "href",
      "/anchors",
    );
    expect(screen.getByRole("link", { name: "Settlements" })).toHaveAttribute(
      "href",
      "/settlements",
    );
  });

  it("renders the wallet connect button", () => {
    render(
      <WalletProvider>
        <SiteHeader />
      </WalletProvider>,
    );
    expect(
      screen.getByRole("button", { name: /connect wallet/i }),
    ).toBeInTheDocument();
  });
});
