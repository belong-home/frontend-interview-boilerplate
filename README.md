# Belong Frontend Interview Boilerplate

This is the starting point for Belong's live-pairing frontend interview. It's a Next.js **Pages
Router** project that mirrors `belong-next` — Belong's real, currently-shipping consumer app — rather
than the newer stack (`react-aria-components`, Valibot, `nuqs`, App Router) reserved for
not-yet-shipped micro-frontends like `consumer-marketing`. Concretely: Next.js 14 / React 18,
`react-query` v3 for data fetching, a hand-rolled fetch client (no TanStack Query v4/v5 defaults, no
Redux), Tailwind v3, and `next-usequerystate` for URL state.

If you're a candidate, read **[CANDIDATE_INSTRUCTIONS.md](./CANDIDATE_INSTRUCTIONS.md)** before the
call.

## Requirements

- Node 20.x (see `.nvmrc`)
- [pnpm](https://pnpm.io) via Corepack

## Setup

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Purpose                           |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Start the dev server              |
| `pnpm build`        | Production build                  |
| `pnpm start`        | Run the production build          |
| `pnpm lint`         | ESLint                            |
| `pnpm lint:fix`     | ESLint with autofix               |
| `pnpm typecheck`    | `tsc --noEmit`                    |
| `pnpm test`         | Run the Vitest suite once         |
| `pnpm test:watch`   | Vitest in watch mode              |
| `pnpm format`       | Prettier, write mode              |
| `pnpm format:check` | Prettier, check mode (used in CI) |

## The mock API

`GET /api/listings` is a mock backend (`src/pages/api/listings.ts`) backed by an in-memory,
deterministic set of 48 seed listings. **It intentionally injects 300–1200ms of random latency and
fails with a 500 roughly 1 in 6 requests.** This is not a bug — it's there so that a UI which doesn't
handle loading states, errors, or stale/out-of-order responses will visibly show it during the
interview. Don't "fix" the mock API by removing the chaos injection.

## Project structure

```
src/pages/                    Next.js Pages Router routes (_app, _document, index, api/listings)
src/api/                      Types + the fetchListingsService client function
src/utils/                    The hand-rolled fetch client (api-client.ts / build-api-client.ts) + cn()
src/features/listings/        The listings feature: constants + components (ListingsPage, ListingCard)
src/components/ui/            Small primitives (Button, TextField, Select)
src/mock-api/                 Seed data, the mock API's pure filter/paginate logic, chaos injection
```

## Why this stack (and what's deliberately different from belong-next)

This boilerplate mirrors belong-next's real patterns closely: Next 14 Pages Router, `react-query` v3
(`useQuery`, `QueryClientProvider` set up in `_app.tsx` exactly like the real app), a hand-rolled fetch
client that throws and has no cancellation support, `zustand` available but not needed for page-local
filters, and `getServerSideProps` reading `ctx.query` for SSR. A few deliberate differences:

- **No Storybook/Playwright/Chromatic** — too heavy for a single-feature, 45–90 minute interview.
  Vitest + React Testing Library stands in for component testing, even though belong-next itself has
  no test infrastructure today — this is a bonus signal opportunity in the boilerplate, not a claim
  that it matches production.
- **`eslint-plugin-promise`** is included even though belong-next's real lint config doesn't have it —
  floating-promise detection is directly relevant to the async-correctness skill this interview
  probes.
- **`reactStrictMode: true`** (belong-next's real `next.config.js` sets this to `false`) — kept on here
  so effect double-invocation in dev helps surface exactly the kind of async bugs this interview is
  designed to catch.
- **`@types/react`/`@types/react-dom` pinned to 17.x** even though the app runs React 18.2.0 — this
  matches belong-next's actual `catalog:legacy` versions, needed because `react-query` v3's types
  predate React 18's stricter `FC` children typing.
