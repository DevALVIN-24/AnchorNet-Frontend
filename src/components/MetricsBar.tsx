"use client";

import { useCallback } from "react";
import { fetchMetrics } from "@/lib/metricsApi";
import { useAsync } from "@/hooks/useAsync";
import { useInterval } from "@/hooks/useInterval";
import { formatAmount } from "@/lib/format";
import { StatCard } from "./StatCard";
import { Card } from "./Card";
import { Spinner } from "./Spinner";

/** Refresh interval for live metrics, in milliseconds. */
const REFRESH_MS = 15_000;

/** Top-of-page row of aggregate network metrics, refreshed periodically. */
export function MetricsBar() {
  const load = useCallback((signal: AbortSignal) => fetchMetrics(signal), []);
  const { state, refresh } = useAsync(load);
  useInterval(refresh, REFRESH_MS);

  if (state.status === "loading") {
    return (
      <Card>
        <Spinner label="Loading metrics…" />
      </Card>
    );
  }

  if (state.status === "error") {
    return (
      <Card>
        <p className="text-sm text-red-400">
          Metrics unavailable: {state.message}
        </p>
      </Card>
    );
  }

  const m = state.data;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard
        label="Active anchors"
        value={`${m.activeAnchors}/${m.anchors}`}
      />
      <StatCard label="Pools" value={String(m.pools)} />
      <StatCard label="Total liquidity" value={formatAmount(m.totalLiquidity)} />
      <StatCard
        label="Settlements"
        value={String(m.settlements)}
        hint={`${m.pendingSettlements} pending`}
      />
    </div>
  );
}
