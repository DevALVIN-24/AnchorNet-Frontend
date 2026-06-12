"use client";

import { useWallet } from "@/hooks/useWallet";
import { truncateAddress } from "@/lib/wallet";

/** Header button that connects or disconnects the mock wallet. */
export function ConnectButton() {
  const { account, connect, disconnect } = useWallet();

  if (account) {
    return (
      <button
        onClick={disconnect}
        className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
        title="Disconnect"
      >
        {truncateAddress(account.address)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-white"
    >
      Connect wallet
    </button>
  );
}
