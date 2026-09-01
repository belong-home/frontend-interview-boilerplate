import type { GetServerSideProps, NextPage } from 'next';
import { fetchListingsService } from '@/api/listings';
import type { ListingsResponse } from '@/api/types';
import { ListingsPage } from '@/features/listings/components/listings-page';

type HomeProps = {
  initialListings: ListingsResponse;
};

const Home: NextPage<HomeProps> = ({ initialListings }) => {
  return <ListingsPage initialListings={initialListings} />;
};

// NOTE(candidate): this always fetches the unfiltered first page — it never
// reads `ctx.query`, so a shared, bookmarked, or refreshed URL with filters
// in it won't be reflected in what's server-rendered.
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const initialListings = await fetchListingsService({});
  return { props: { initialListings } };
};

export default Home;
