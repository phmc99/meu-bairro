import { Flex, Heading, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import AppCommerceList from '../../../../../components/app/AppCommerceList';
import AppNavBar from '../../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../../components/app/NavigationHeader';
import { getCommercesByCategory } from '../../../../../services/category';
import { ICommerce } from '../../../../../types';
import { useEffect, useState } from 'react';
import AppCommerceItem from '../../../../../components/app/AppCommerceItem';

interface CategoryPageProps {
  category: string;
}

const Category = ({ category }: CategoryPageProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const fetchMoreData = async () => {
    const data = await getCommercesByCategory(category, page);
    setItems([...items, ...data.data]);
    setPage(data.next_page);
    setLoading(false);
  };

  // Se category não estiver na lista de categorias, não fazer req

  // useEffect(() => {
  //   if (category === '‎') {
  //     Router.push('/app');
  //     return;
  //   }
  // }, [category]);

  // if (error) {
  //   return (
  //     <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
  //       <Heading color="gray.300" size="lg">
  //         Algo de errado aconteceu!
  //       </Heading>
  //     </Flex>
  //   );
  // }

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
        <title>App Meu Bairro - {title}</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title={`${title}`} />
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
            Nenhum comércio na categoria {category}
          </Heading>
        )}
      </AppCommerceList>
      <AppNavBar />
    </>
  );
};

export default Category;

export async function getServerSideProps(context: any) {
  const { category } = context.query;
  return { props: { category } };
}
