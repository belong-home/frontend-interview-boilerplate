# Candidate Instructions

## Before the call

Please have this repo cloned and set up **before** our session starts, so we don't spend interview
time on `pnpm install`:

```bash
corepack enable
pnpm install
pnpm dev
```

Confirm [http://localhost:3000](http://localhost:3000) loads a "Find your next home" page with a
search box, a bedrooms dropdown, and a grid of listing cards.

## Scenario

You're joining the Belong web team. Product wants a searchable, filterable list of rental listings —
this is the same kind of page as the real `/homes` search on belong.com, built the way Belong
actually builds pages like it: Next.js Pages Router, `react-query`, and a hand-rolled fetch client
(no TanStack Query v4/v5 defaults, no Redux). The page shell, mock backend, and base UI components
are already stubbed in so you can start on the interesting part immediately.

## What's already built

- A mock API at `GET /api/listings` (`src/pages/api/listings.ts`) supporting a `q` text search and a
  `bedrooms` filter, with pagination (`page`/`pageSize`). It has realistic, **intentional** latency
  and occasionally errors — see the README.
- Plain typed data: `Listing` / `ListingsResponse` / `ListingsListParams` (`src/api/types.ts`).
- `fetchListingsService(params)` in `src/api/listings.ts`, built on a small hand-rolled API client
  (`src/utils/api-client.ts`) that mirrors Belong's real one — it throws an `ApiError` on failure and
  has **no concept of request cancellation at all**. If you need to guard against a stale response,
  that's on whatever calls it, not the client.
- `react-query`'s `QueryClientProvider` is already wired up in `src/pages/_app.tsx`, same singleton
  pattern the real app uses — available for you to reach for, not yet used anywhere.
- Three UI primitives: `Button`, `TextField`, `Select` (`src/components/ui/`).
- `ListingCard`, a prebuilt presentational card (`src/features/listings/components/listing-card.tsx`).
- `src/pages/index.tsx` has a `getServerSideProps` that fetches page 1 server-side for the initial
  render (so the page isn't blank on load) — but it doesn't read `ctx.query`, so it always fetches the
  same unfiltered first page no matter what's in the URL.
- `ListingsPage` (`src/features/listings/components/listings-page.tsx`) — renders the search box,
  bedrooms dropdown, and the initial grid, but the controls don't do anything yet: they just hold
  local state.

## What we'd like you to build

Starting from `ListingsPage`, wire this up into a working search/filter experience:

- [ ] Typing in the search box re-queries the listings (**debounced** — not one request per keystroke).
- [ ] Changing the bedrooms dropdown re-queries the listings.
- [ ] Visible loading, error, and empty states — no silent failures.
- [ ] Guard against stale/out-of-order responses (e.g. a slow request for an earlier keystroke or earlier page landing after a faster, more recent one).
- [ ] Some form of pagination — a "Load more" button or page numbers, your choice.
- [ ] Filters and page reflected in the URL (so a refresh or shared link keeps them), and `getServerSideProps` reading `ctx.query` so the server-rendered result matches too.
- [ ] Structure the solution the way you'd structure it in a real PR.

## Constraints

- `react-query` (v3), `zustand`, `next-usequerystate`, and `es-toolkit` are already installed — no
  need to `pnpm add` anything for the core requirements. You almost certainly don't need `zustand`
  here; the real app doesn't use it for page-local filters either.
- Ask before adding any other dependency.

## Out of scope

- Auth, a listing detail page, mobile polish.
- Automated tests for your new code (a nice-to-have if time allows, not required).
- The `city` and rent-range filters the API supports but the starter UI doesn't expose.

## Time budget

45–90 minutes. Roughly: ~5–10 min to look around, most of the remaining time building, and let's
keep 5–10 min at the end to talk through trade-offs.

## If you finish early

- Retry-with-backoff on a failed request.
- Infinite scroll instead of a "Load more" button.
- Wire up the `city` or rent-range filters the API already supports.
- Write a test for whatever hook you extracted.
