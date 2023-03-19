import { Flex, Heading, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';
import { getNearestNeighborhood } from '../../../../services/cep';
import { getNewCommerces } from '../../../../services/commerce';
import { ICommerce } from '../../../../types';

interface NewCommerceProps {
  neighborhood: string;
}

const NewCommerce = ({ neighborhood }: NewCommerceProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMoreData = async () => {
    const data = await getNewCommerces(neighborhood, page);
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
        <title>App Meu Bairro - Novos comércios</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Chegaram agora" />
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
            Nenhum comércio novo.
          </Heading>
        )}
      </AppCommerceList>
      <AppNavBar />
    </>
  );
};

export default NewCommerce;

export async function getServerSideProps(context: any) {
  const { lat, lng } = context.query;

  if (!lat || !lng) {
    return { props: {} };
  }

  const neighborhood = await getNearestNeighborhood(lat, lng);

  return { props: { neighborhood } };
}
