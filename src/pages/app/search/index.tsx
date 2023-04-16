import Head from 'next/head';
import AppCategoryList from '../../../components/app/AppCategoryList';
import AppNavBar from '../../../components/app/AppNavBar';
import AppSearchInput from '../../../components/app/AppSearchInput';
import NavigationHeader from '../../../components/app/NavigationHeader';
import { useState } from 'react';
import { ICommerce } from '../../../types';
import api from '../../../services/api';
import AppCommerceList from '../../../components/app/AppCommerceList';
import AppCommerceItem from '../../../components/app/AppCommerceItem';
import { Progress, useToast } from '@chakra-ui/react';

const AppSearch = () => {
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commerces, setCommerces] = useState<ICommerce[]>([]);

  const toast = useToast();

  const handleSearch = async () => {
    setIsLoading(true);
    const endpoint = `/commerce/search?value=${value.trim()}&page=${page}&perPage=10`;
    const { data } = await api.get(endpoint);
    setHasMore(data.next_page != null ? true : false);
    setCommerces([...commerces, ...data.data]);
    setPage(data.next_page);

    if (data.count === 0) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top',
        title: 'Sem resultados para essa busca'
      });
    }

    setIsLoading(false);
  };

  const handleClearSearch = () => {
    setValue('');
    setCommerces([]);
  };

  return (
    <>
      <Head>
        <title>App Meu Bairro - Pesquisar</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Pesquisar comércios" />
      <AppSearchInput
        value={value}
        setValue={setValue}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      {isLoading ? <Progress size="xs" isIndeterminate /> : null}
      {commerces.length <= 0 ? <AppCategoryList /> : null}
      {commerces.length > 0 ? (
        <AppCommerceList
          fetchMoreData={handleSearch}
          hasMore={hasMore}
          dataLength={commerces.length}
        >
          {commerces.map(item => (
            <AppCommerceItem
              key={item._id}
              id={item._id}
              category={item.category}
              logo={item.logo}
              name={item.name}
              neighborhood={item.neighborhood}
              totalRate={item.totalRate}
            />
          ))}
        </AppCommerceList>
      ) : null}
      <AppNavBar />
    </>
  );
};

export default AppSearch;
