/**
 * Shared types mirroring the AnchorNet API contract.
 */

/** Aggregate liquidity available for an asset across all anchors. */
export interface Pool {
  asset: string;
  total: number;
  anchors: number;
}

/** A single anchor's liquidity contribution to an asset pool. */
export interface LiquidityEntry {
  anchor: string;
  asset: string;
  amount: number;
  updatedAt: string;
}

/** A request to route `amount` of `asset` through available liquidity. */
export interface QuoteRequest {
  asset: string;
  amount: number;
}

/** A computed routing quote for a {@link QuoteRequest}. */
export interface Quote {
  asset: string;
  amount: number;
  fee: number;
  deliverable: number;
  route: string[];
}

/** Error envelope returned by the API. */
export interface ApiErrorBody {
  error: { code: string; message: string };
}
