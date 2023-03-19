import Head from 'next/head';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import { ICommerce } from '../../../../types';
import { getCloserCommerces } from '../../../../services/commerce';
import { getNearestNeighborhood } from '../../../../services/cep';

interface CloserCommerceProps {
  neighborhood: string;
}

const Closer = ({ neighborhood }: CloserCommerceProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMoreData = async () => {
    const data = await getCloserCommerces(neighborhood, page);
    setItems([...items, ...data.data]);
    setPage(data.next_page);
    setLoading(false);
  };

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>App Meu Bairro - Mais próximos</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Mais próximos" />
      <AppCommerceList
        fetchMoreData={fetchMoreData}
        dataLength={items.length}
        hasMore={page != null ? true : false}
      >
        {items.length > 0 ? (
          items.map(item => (
            <AppCommerceItem
              key={item._id}
              id={item._id}
              logo={item.logo}
              name={item.name}
              category={item.category}
              neighborhood={item.neighborhood}
            />
          ))
        ) : (
          <Heading p={5} color="gray.300" size="lg">
            Nenhum comércio próximo.
          </Heading>
        )}
      </AppCommerceList>
      <AppNavBar />
    </>
  );
};

export default Closer;

export async function getServerSideProps(context: any) {
  const { lat, lng } = context.query;

  if (!lat || !lng) {
    return { props: {} };
  }

  const neighborhood = await getNearestNeighborhood(lat, lng);

  return { props: { neighborhood } };
}
