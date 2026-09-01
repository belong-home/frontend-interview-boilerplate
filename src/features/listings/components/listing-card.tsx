import Image from 'next/image';
import type { Listing } from '@/api/types';

const rentFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray bg-white">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={listing.imageUrl}
          alt={`${listing.addressLine1}, ${listing.city}, ${listing.state}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div>
          <p className="font-semibold text-black">{listing.addressLine1}</p>
          <p className="text-sm text-dark-gray">
            {listing.city}, {listing.state} {listing.zip}
          </p>
        </div>
        <p className="text-lg font-semibold text-navy">
          {rentFormatter.format(listing.rent)}
          <span className="text-sm font-normal text-dark-gray">/mo</span>
        </p>
        <p className="text-sm text-black">
          {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bd`} ·{' '}
          {listing.bathrooms} ba · {listing.squareFeet.toLocaleString()} sqft
        </p>
        <p className="text-sm text-dark-gray">
          Available {dateFormatter.format(new Date(listing.availableDate))}
        </p>
        {listing.petFriendly && (
          <p className="text-sm text-green">Pet friendly</p>
        )}
      </div>
    </article>
  );
}
