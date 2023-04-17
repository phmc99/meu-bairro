import Head from 'next/head';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';
import { Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import { ICommerce } from '../../../../types';
import { getCloserCommerces } from '../../../../services/commerce';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';

const Closer = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { neighborhood } = useSelector((state: AppState) => state.location);

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
              totalRate={item.totalRate}
            />
          ))
        ) : (
          <Heading p={5} color="gray.300" fontWeight={600} size="lg">
            {loading ? 'Carregando...' : 'Nenhum comércio por aqui.'}
          </Heading>
        )}
      </AppCommerceList>
      <AppNavBar />
    </>
  );
};

export default Closer;
