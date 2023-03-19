import Head from 'next/head';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { ICommerce } from '../../../../types';
import { useState, useEffect } from 'react';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import { getNearestNeighborhood } from '../../../../services/cep';
import { getBestRatedCommerces } from '../../../../services/commerce';

interface BestRatedCommerceProps {
  neighborhood: string;
}

const BestRated = ({ neighborhood }: BestRatedCommerceProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMoreData = async () => {
    const data = await getBestRatedCommerces(neighborhood, page);
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
        <title>App Meu Bairro - Melhores avaliados</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Melhores avaliados" />
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
              totalRate={item.totalRate}
            />
          ))
        ) : (
          <Heading p={5} color="gray.300" size="lg">
            Nenhum comércio novo.
          </Heading>
        )}
      </AppCommerceList>
      <AppNavBar />
    </>
  );
};

export default BestRated;

export async function getServerSideProps(context: any) {
  const { lat, lng } = context.query;

  if (!lat || !lng) {
    return { props: {} };
  }

  const neighborhood = await getNearestNeighborhood(lat, lng);

  return { props: { neighborhood } };
}
