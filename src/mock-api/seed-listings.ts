import type { Listing } from '@/api/types';

const METROS = [
  { city: 'Atlanta', state: 'GA', baseRent: 1850 },
  { city: 'Charlotte', state: 'NC', baseRent: 1750 },
  { city: 'Tampa', state: 'FL', baseRent: 2050 },
  { city: 'Orlando', state: 'FL', baseRent: 1950 },
  { city: 'Phoenix', state: 'AZ', baseRent: 2150 },
  { city: 'Dallas', state: 'TX', baseRent: 1900 },
  { city: 'Nashville', state: 'TN', baseRent: 2000 },
  { city: 'Jacksonville', state: 'FL', baseRent: 1700 },
];

const STREET_NAMES = [
  'Maple Ave',
  'Oak Ridge Dr',
  'Sunset Blvd',
  'Willow Creek Ln',
  'Magnolia St',
  'Cedar Hollow Rd',
  'Birchwood Ct',
  'Highland Pkwy',
];

const BATHROOM_CYCLE = [1, 1.5, 2, 2.5, 3];

const LISTING_COUNT = 48;

const BASE_AVAILABLE_DATE = new Date('2026-09-15T00:00:00.000Z');

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function buildListing(index: number): Listing {
  const metro = METROS[index % METROS.length]!;
  const street = STREET_NAMES[index % STREET_NAMES.length]!;
  const bedrooms = index % 5;
  const bathrooms = BATHROOM_CYCLE[index % BATHROOM_CYCLE.length]!;
  const id = `lst-${String(index + 1).padStart(3, '0')}`;

  return {
    id,
    addressLine1: `${100 + index * 3} ${street}`,
    city: metro.city,
    state: metro.state,
    zip: String(30000 + ((index * 37) % 9000)),
    bedrooms,
    bathrooms,
    rent: metro.baseRent + bedrooms * 350 + (index % 4) * 25,
    squareFeet: 550 + bedrooms * 260 + (index % 3) * 40,
    availableDate: addDays(BASE_AVAILABLE_DATE, (index % 6) * 7).toISOString(),
    imageUrl: `https://picsum.photos/seed/${id}/640/480`,
    petFriendly: index % 3 !== 0,
  };
}

export const SEED_LISTINGS: Listing[] = Array.from(
  { length: LISTING_COUNT },
  (_, index) => buildListing(index),
);
