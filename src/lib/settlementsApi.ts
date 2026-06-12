/**
 * API client for settlement endpoints.
 */

import { apiRequest } from "./api";
import { Settlement } from "./types";

/** Fetches settlements, optionally filtered by anchor. */
export async function fetchSettlements(
  anchor?: string,
  signal?: AbortSignal,
): Promise<Settlement[]> {
  const query = anchor ? `?anchor=${encodeURIComponent(anchor)}` : "";
  const body = await apiRequest<{ settlements: Settlement[] }>(
    `/api/v1/settlements${query}`,
    { signal },
  );
  return body.settlements;
}

/** Opens a new settlement, reserving liquidity. */
export async function openSettlement(input: {
  anchor: string;
  asset: string;
  amount: number;
}): Promise<Settlement> {
  return apiRequest<Settlement>("/api/v1/settlements", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/** Executes a pending settlement. */
export async function executeSettlement(id: number): Promise<Settlement> {
  return apiRequest<Settlement>(`/api/v1/settlements/${id}/execute`, {
    method: "POST",
  });
}

/** Cancels a pending settlement. */
export async function cancelSettlement(id: number): Promise<Settlement> {
  return apiRequest<Settlement>(`/api/v1/settlements/${id}/cancel`, {
    method: "POST",
  });
}
