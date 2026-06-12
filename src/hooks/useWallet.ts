"use client";

import { useContext } from "react";
import {
  WalletContext,
  WalletContextValue,
} from "@/components/WalletProvider";

/** Accesses the wallet context. Must be used within a `WalletProvider`. */
export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
