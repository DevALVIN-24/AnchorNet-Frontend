import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount rendered components between tests so component tests don't leak
// into one another (auto-cleanup relies on Jest/vitest globals, which this
// project intentionally doesn't enable).
afterEach(() => {
  cleanup();
});
