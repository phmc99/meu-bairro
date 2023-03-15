import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from '../store';
import { QueryClientProvider, Hydrate, QueryClient } from 'react-query';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(App);
