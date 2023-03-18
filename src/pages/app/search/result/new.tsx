import { Flex, Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import NavigationHeader from '../../../../components/app/NavigationHeader';
import api from '../../../../services/api';
import { getNewCommerces } from '../../../../services/commerce';
import { ICommerce } from '../../../../types';

const NewCommerce = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [neighborhood, setNeighborhood] = useState<string | undefined>('');

  const fetchMoreData = async () => {
    const data = await getNewCommerces(neighborhood, page);
    setItems([...items, ...data.data]);
    setPage(data.next_page);
    setLoading(false);
  };

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_CEP_ABERTO_TOKEN;
    const userCords = JSON.parse(
      localStorage.getItem('user-cords') || 'undefined'
    );

    if (!userCords) {
      return;
    }
    axios
      .get(
        `https://www.cepaberto.com/api/v3/nearest?lat=${userCords.lat}&lng=${userCords.lng}`,
        {
          headers: {
            Authorization: `Token token=${token}`
          }
        }
      )
      .then(({ data }) => {
        axios
          .get(`https://viacep.com.br/ws/${data.cep}/json/`)
          .then(({ data }) => {
            if (data.bairro) {
              setNeighborhood(data.bairro);
            }
            setNeighborhood(undefined);
          });
      });
  }, []);

  useEffect(() => {
    api
      .get(`/commerce/new?neighborhood=${neighborhood}page=${page}&perPage=10`)
      .then(({ data }) => {
        setItems([...items, ...data.data]);
        setPage(data.next_page);
        setLoading(false);
      });
  }, [items, neighborhood, page]);

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
    </>
  );
};

export default NewCommerce;
