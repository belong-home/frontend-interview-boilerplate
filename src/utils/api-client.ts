import {
  buildApiClientHelpers,
  fetcher,
  type BaseClient,
} from './build-api-client';

/**
 * A relative path resolves fine in the browser, but `fetch` on the server has
 * no implicit origin — `getServerSideProps` needs an absolute URL. Same
 * distinction the real client has to make between browser and server calls.
 */
function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  const port = process.env.PORT ?? '3000';
  return process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${port}`;
}

const baseClient: BaseClient = (endpoint, config) =>
  fetcher(`${getApiBaseUrl()}${endpoint}`, config);

export const apiClient = buildApiClientHelpers(baseClient);

export type ApiClient = typeof apiClient;
