# Changelog

All notable changes to the AnchorNet web app are documented here.

## [0.2.0]

### Added

- **Pages:** `/anchors` (register, list, deactivate) and `/settlements` (open,
  execute, cancel), plus a live metrics bar on `/dashboard`.
- **API clients:** anchors, settlements and metrics clients on a shared
  `apiRequest` helper.
- **Wallet:** a mock wallet connect (`WalletProvider`, `useWallet`,
  `ConnectButton`) in the header.
- **Hooks:** `useAsync` (with silent `refresh`) and `useInterval` for polling.
- **UI:** StatusBadge, Spinner, EmptyState, tables, forms and panels for anchors
  and settlements; shared site footer.
- **Tests:** Vitest coverage for the API clients and formatting/wallet helpers.

## [0.1.0]

### Added

- Initial landing page and a liquidity dashboard with pools and a routing quote
  form, backed by a typed API client and Vitest setup.
