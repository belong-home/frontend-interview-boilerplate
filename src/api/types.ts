export type Listing = {
  id: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  squareFeet: number;
  availableDate: string;
  imageUrl: string;
  petFriendly: boolean;
};

export type ListingsResponse = {
  items: Listing[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

/**
 * Filters as they travel over the wire: querystring-friendly (strings), same
 * shape client and server side so there's one source of truth for param names.
 */
export type ListingsListParams = {
  q?: string;
  city?: string;
  bedrooms?: number;
  minRent?: number;
  maxRent?: number;
  page?: number;
  pageSize?: number;
};
