import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import AppCommerceList from '../../../../../components/app/AppCommerceList';
import AppNavBar from '../../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../../components/app/NavigationHeader';
import { ICommerce } from '../../../../../types';
import { useEffect, useState } from 'react';
import AppCommerceItem from '../../../../../components/app/AppCommerceItem';
import { getCommercesByCategory } from '../../../../../services/commerce';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';

interface CategoryPageProps {
  category: string;
}

const Category = ({ category }: CategoryPageProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ICommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const { neighborhood } = useSelector((state: AppState) => state.location);

  const fetchMoreData = async () => {
    const data = await getCommercesByCategory(category, neighborhood, page);
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
          <Heading p={5} color="gray.300" fontWeight={600} size="lg">
            {loading
              ? 'Carregando...'
              : `Nenhum comércio na categoria ${category}`}
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
