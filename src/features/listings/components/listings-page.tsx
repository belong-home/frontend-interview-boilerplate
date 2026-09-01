import { useState } from 'react';
import { TextField } from '@/components/ui/text-field';
import { Select } from '@/components/ui/select';
import type { ListingsResponse } from '@/api/types';
import { BEDROOM_OPTIONS } from '../constants';
import { ListingCard } from './listing-card';

// TODO(candidate): see CANDIDATE_INSTRUCTIONS.md. Search and the bedrooms
// select below just hold local state right now — they don't refetch
// listings, there's no pagination, and there's no loading/error/empty UI.

type ListingsPageProps = {
  initialListings: ListingsResponse;
};

export function ListingsPage({ initialListings }: ListingsPageProps) {
  const [search, setSearch] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-navy">
          Find your next home
        </h1>
        <p className="text-dark-gray">
          {initialListings.totalItems} available rentals
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-full max-w-sm">
          <TextField
            label="Search"
            type="search"
            placeholder="City, address..."
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className="w-full max-w-xs">
          <Select
            label="Bedrooms"
            value={bedrooms}
            onChange={setBedrooms}
            options={BEDROOM_OPTIONS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {initialListings.items.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
