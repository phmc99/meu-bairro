import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';
import { getNewCommerces } from '../../../../services/commerce';
import { ICommerce } from '../../../../types';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';

const NewCommerce = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { neighborhood } = useSelector((state: AppState) => state.location);

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

export default NewCommerce;
