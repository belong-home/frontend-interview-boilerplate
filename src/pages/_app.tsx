import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const isProd = process.env.NODE_ENV === 'production';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            console.error(error);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 10_000,
            retry: isProd,
            refetchOnWindowFocus: isProd,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${montserrat.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
