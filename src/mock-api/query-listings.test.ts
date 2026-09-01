import { describe, expect, it } from 'vitest';
import { queryListings, type NormalizedListingsParams } from './query-listings';
import type { Listing } from '@/api/types';

const FIXTURE_LISTINGS: Listing[] = [
  {
    id: 'lst-001',
    addressLine1: '100 Maple Ave',
    city: 'Atlanta',
    state: 'GA',
    zip: '30301',
    bedrooms: 1,
    bathrooms: 1,
    rent: 1800,
    squareFeet: 700,
    availableDate: '2026-09-15T00:00:00.000Z',
    imageUrl: 'https://picsum.photos/seed/lst-001/640/480',
    petFriendly: true,
  },
  {
    id: 'lst-002',
    addressLine1: '200 Oak Ridge Dr',
    city: 'Charlotte',
    state: 'NC',
    zip: '28201',
    bedrooms: 2,
    bathrooms: 2,
    rent: 2100,
    squareFeet: 950,
    availableDate: '2026-09-22T00:00:00.000Z',
    imageUrl: 'https://picsum.photos/seed/lst-002/640/480',
    petFriendly: false,
  },
  {
    id: 'lst-003',
    addressLine1: '300 Sunset Blvd',
    city: 'Tampa',
    state: 'FL',
    zip: '33601',
    bedrooms: 4,
    bathrooms: 2.5,
    rent: 2900,
    squareFeet: 1600,
    availableDate: '2026-09-29T00:00:00.000Z',
    imageUrl: 'https://picsum.photos/seed/lst-003/640/480',
    petFriendly: true,
  },
  {
    id: 'lst-004',
    addressLine1: '400 Willow Creek Ln',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    bedrooms: 5,
    bathrooms: 3,
    rent: 3400,
    squareFeet: 2000,
    availableDate: '2026-10-06T00:00:00.000Z',
    imageUrl: 'https://picsum.photos/seed/lst-004/640/480',
    petFriendly: true,
  },
  {
    id: 'lst-005',
    addressLine1: '500 Magnolia St',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85001',
    bedrooms: 0,
    bathrooms: 1,
    rent: 1400,
    squareFeet: 500,
    availableDate: '2026-10-13T00:00:00.000Z',
    imageUrl: 'https://picsum.photos/seed/lst-005/640/480',
    petFriendly: false,
  },
];

function baseParams(
  overrides: Partial<NormalizedListingsParams> = {},
): NormalizedListingsParams {
  return {
    q: null,
    city: null,
    bedrooms: null,
    minRent: null,
    maxRent: null,
    page: 1,
    pageSize: 12,
    ...overrides,
  };
}

describe('queryListings', () => {
  it('returns up to pageSize items on the default page', () => {
    const result = queryListings(FIXTURE_LISTINGS, baseParams({ pageSize: 2 }));
    expect(result.items).toHaveLength(2);
    expect(result.totalItems).toBe(5);
    expect(result.totalPages).toBe(3);
  });

  it('slices the correct items for a later page', () => {
    const result = queryListings(
      FIXTURE_LISTINGS,
      baseParams({ page: 2, pageSize: 2 }),
    );
    expect(result.items.map((listing) => listing.id)).toEqual([
      'lst-003',
      'lst-004',
    ]);
  });

  it('treats bedrooms=4 as "4 or more"', () => {
    const result = queryListings(FIXTURE_LISTINGS, baseParams({ bedrooms: 4 }));
    expect(result.items.map((listing) => listing.id)).toEqual([
      'lst-003',
      'lst-004',
    ]);
  });

  it('matches q case-insensitively across address, city, and state', () => {
    const result = queryListings(
      FIXTURE_LISTINGS,
      baseParams({ q: 'ATLANTA' }),
    );
    expect(result.items.map((listing) => listing.id)).toEqual(['lst-001']);
  });

  it('returns an empty result set without erroring when nothing matches', () => {
    const result = queryListings(
      FIXTURE_LISTINGS,
      baseParams({ city: 'Seattle' }),
    );
    expect(result.items).toEqual([]);
    expect(result.totalItems).toBe(0);
    expect(result.totalPages).toBe(1);
  });
});
