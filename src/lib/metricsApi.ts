/**
 * API client for the aggregate metrics endpoint.
 */

import { apiRequest } from "./api";
import { Metrics } from "./types";

/** Fetches aggregate network metrics. */
export async function fetchMetrics(signal?: AbortSignal): Promise<Metrics> {
  return apiRequest<Metrics>("/api/v1/metrics", { signal });
}
