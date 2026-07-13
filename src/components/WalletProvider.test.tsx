import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WalletProvider } from "./WalletProvider";
import { useWallet } from "@/hooks/useWallet";

function WalletStatus() {
  const { account, connect, disconnect } = useWallet();
  return (
    <div>
      <span>{account ? account.address : "disconnected"}</span>
      <button onClick={connect}>connect</button>
      <button onClick={disconnect}>disconnect</button>
    </div>
  );
}

afterEach(() => {
  localStorage.clear();
});

describe("WalletProvider", () => {
  it("starts disconnected", () => {
    render(
      <WalletProvider>
        <WalletStatus />
      </WalletProvider>,
    );
    expect(screen.getByText("disconnected")).toBeInTheDocument();
  });

  it("connects and persists the account to localStorage", async () => {
    render(
      <WalletProvider>
        <WalletStatus />
      </WalletProvider>,
    );

    fireEvent.click(screen.getByText("connect"));

    await waitFor(() => {
      expect(screen.queryByText("disconnected")).not.toBeInTheDocument();
    });
    expect(localStorage.getItem("anchornet:wallet")).not.toBeNull();
  });

  it("disconnects and clears the persisted account", async () => {
    render(
      <WalletProvider>
        <WalletStatus />
      </WalletProvider>,
    );

    fireEvent.click(screen.getByText("connect"));
    await waitFor(() => {
      expect(screen.queryByText("disconnected")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("disconnect"));
    expect(screen.getByText("disconnected")).toBeInTheDocument();
    expect(localStorage.getItem("anchornet:wallet")).toBeNull();
  });

  it("restores a previously connected account on mount", async () => {
    localStorage.setItem(
      "anchornet:wallet",
      JSON.stringify({ address: "G" + "A".repeat(55) }),
    );

    render(
      <WalletProvider>
        <WalletStatus />
      </WalletProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("disconnected")).not.toBeInTheDocument();
    });
  });
});
