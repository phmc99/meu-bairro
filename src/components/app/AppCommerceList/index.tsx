import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Progress } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface AppCommerceListProps {
  children: ReactNode;
  fetchMoreData: () => void;
  dataLength: number;
  hasMore: boolean;
}

const AppCommerceList = ({
  children,
  fetchMoreData,
  dataLength,
  hasMore
}: AppCommerceListProps) => {
  const router = useRouter();

  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Progress size="xs" isIndeterminate w="95%" m="0 auto" />}
      endMessage={
        <Button
          variant="link"
          colorScheme="blue"
          p={5}
          onClick={() => router.back()}
          mb={20}
        >
          Voltar
        </Button>
      }
      style={{
        textAlign: 'center'
      }}
    >
      {children}
    </InfiniteScroll>
  );
};

export default AppCommerceList;
