import type { Listing, ListingsResponse } from '@/api/types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

export type NormalizedListingsParams = {
  q: string | null;
  city: string | null;
  bedrooms: number | null;
  minRent: number | null;
  maxRent: number | null;
  page: number;
  pageSize: number;
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseNumberParam(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * `req.query` from a Pages Router API route is already parsed, but every
 * value is a string (or string[] for repeated keys) — this is the one place
 * that turns those into the numbers/defaults `queryListings` expects.
 */
export function parseListingsQuery(
  query: Record<string, string | string[] | undefined>,
): NormalizedListingsParams {
  const page = parseNumberParam(firstValue(query.page)) ?? DEFAULT_PAGE;
  const pageSize = Math.min(
    parseNumberParam(firstValue(query.pageSize)) ?? DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
  );

  return {
    q: firstValue(query.q) || null,
    city: firstValue(query.city) || null,
    bedrooms: parseNumberParam(firstValue(query.bedrooms)),
    minRent: parseNumberParam(firstValue(query.minRent)),
    maxRent: parseNumberParam(firstValue(query.maxRent)),
    page: Math.max(1, page),
    pageSize: Math.max(1, pageSize),
  };
}

function matchesQuery(
  listing: Listing,
  params: NormalizedListingsParams,
): boolean {
  if (params.q) {
    const haystack =
      `${listing.addressLine1} ${listing.city} ${listing.state}`.toLowerCase();
    if (!haystack.includes(params.q.toLowerCase())) return false;
  }

  if (params.city && listing.city.toLowerCase() !== params.city.toLowerCase()) {
    return false;
  }

  // 4 means "4 bedrooms or more", matching how the real homes filter treats its top bucket.
  if (params.bedrooms !== null) {
    if (
      params.bedrooms >= 4
        ? listing.bedrooms < 4
        : listing.bedrooms !== params.bedrooms
    ) {
      return false;
    }
  }

  if (params.minRent !== null && listing.rent < params.minRent) return false;
  if (params.maxRent !== null && listing.rent > params.maxRent) return false;

  return true;
}

export function queryListings(
  listings: Listing[],
  params: NormalizedListingsParams,
): ListingsResponse {
  const matched = listings.filter((listing) => matchesQuery(listing, params));

  const totalItems = matched.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / params.pageSize));
  const page = Math.min(params.page, totalPages);

  const start = (page - 1) * params.pageSize;
  const items = matched.slice(start, start + params.pageSize);

  return { items, page, pageSize: params.pageSize, totalItems, totalPages };
}
