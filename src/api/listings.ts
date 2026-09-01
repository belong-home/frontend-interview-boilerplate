import queryString from 'query-string';
import { apiClient, type ApiClient } from '@/utils/api-client';
import type { ListingsListParams, ListingsResponse } from './types';

export function fetchListingsService(
  params: ListingsListParams,
  client: ApiClient = apiClient,
): Promise<ListingsResponse> {
  return client.get<ListingsResponse>(
    `/api/listings?${queryString.stringify(params)}`,
  );
}
