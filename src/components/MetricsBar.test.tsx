import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MetricsBar } from "./MetricsBar";
import { fetchMetrics } from "@/lib/metricsApi";

vi.mock("@/lib/metricsApi", () => ({
  fetchMetrics: vi.fn(),
}));

describe("MetricsBar", () => {
  it("shows a loading state before metrics resolve", () => {
    vi.mocked(fetchMetrics).mockReturnValue(new Promise(() => {}));
    render(<MetricsBar />);
    expect(screen.getByText(/loading metrics/i)).toBeInTheDocument();
  });

  it("renders metrics once loaded", async () => {
    vi.mocked(fetchMetrics).mockResolvedValue({
      anchors: 5,
      activeAnchors: 3,
      pools: 2,
      totalLiquidity: 12_345,
      settlements: 10,
      pendingSettlements: 4,
    });

    render(<MetricsBar />);

    await waitFor(() => {
      expect(screen.getByText("3/5")).toBeInTheDocument();
    });
    expect(screen.getByText("12,345")).toBeInTheDocument();
    expect(screen.getByText("4 pending")).toBeInTheDocument();
  });

  it("shows an error message when metrics fail to load", async () => {
    vi.mocked(fetchMetrics).mockRejectedValue(new Error("network down"));

    render(<MetricsBar />);

    await waitFor(() => {
      expect(screen.getByText(/network down/i)).toBeInTheDocument();
    });
  });
});
