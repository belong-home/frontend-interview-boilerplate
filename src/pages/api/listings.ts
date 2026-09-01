import type { NextApiRequest, NextApiResponse } from 'next';
import { parseListingsQuery, queryListings } from '@/mock-api/query-listings';
import { SEED_LISTINGS } from '@/mock-api/seed-listings';
import { simulateNetworkConditions } from '@/mock-api/simulate-network-conditions';
import type { ListingsResponse } from '@/api/types';

type ErrorBody = { message: string; code: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListingsResponse | ErrorBody>,
) {
  const { shouldError } = await simulateNetworkConditions();

  if (shouldError) {
    res.status(500).json({
      message: 'Something went wrong fetching listings. Please try again.',
      code: 'LISTINGS_FETCH_FAILED',
    });
    return;
  }

  const params = parseListingsQuery(req.query);
  res.status(200).json(queryListings(SEED_LISTINGS, params));
}
