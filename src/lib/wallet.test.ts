import { describe, it, expect, beforeEach } from "vitest";
import {
  truncateAddress,
  mockAddress,
  saveAccount,
  loadAccount,
  clearAccount,
} from "./wallet";

describe("truncateAddress", () => {
  it("shortens a long address", () => {
    expect(truncateAddress("GABCDEFG1234WXYZ")).toBe("GABC…WXYZ");
  });

  it("leaves short addresses untouched", () => {
    expect(truncateAddress("GABC")).toBe("GABC");
  });
});

describe("mockAddress", () => {
  it("produces a 56-character G-address", () => {
    const address = mockAddress();
    expect(address).toHaveLength(56);
    expect(address.startsWith("G")).toBe(true);
  });

  it("is deterministic for a given seed", () => {
    expect(mockAddress("anchorA")).toBe(mockAddress("anchorA"));
  });
});

describe("wallet session persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when nothing has been saved", () => {
    expect(loadAccount()).toBeNull();
  });

  it("round-trips a saved account", () => {
    saveAccount({ address: mockAddress("anchornet-user") });
    expect(loadAccount()).toEqual({ address: mockAddress("anchornet-user") });
  });

  it("clears the persisted account", () => {
    saveAccount({ address: mockAddress("anchornet-user") });
    clearAccount();
    expect(loadAccount()).toBeNull();
  });

  it("ignores malformed persisted data", () => {
    window.localStorage.setItem("anchornet:wallet", "not json");
    expect(loadAccount()).toBeNull();
  });

  it("ignores persisted data missing an address", () => {
    window.localStorage.setItem("anchornet:wallet", JSON.stringify({}));
    expect(loadAccount()).toBeNull();
  });
});
