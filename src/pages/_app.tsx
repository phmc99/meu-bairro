import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from '../store';
import { QueryClientProvider, Hydrate, QueryClient } from 'react-query';
import { useState } from 'react';
import NextNProgress from 'nextjs-progressbar';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <NextNProgress />
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(App);
