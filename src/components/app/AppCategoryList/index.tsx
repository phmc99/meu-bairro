import { Flex, Grid, Heading } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getCategory } from '../../../services/category';
import { ICategoryQuery } from '../../../types';
import AppCategoryItem from '../AppCategoryItem';
import { scrolllBarCategoryList } from './style';
import AppLoading from '../AppLoading';

const AppCategoryList = () => {
  const { data, isLoading, error }: ICategoryQuery = useQuery(
    ['category'],
    () => {
      return getCategory();
    }
  );

  if (error) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Heading color="gray.300" size="lg">
          Algo de errado aconteceu!
        </Heading>
      </Flex>
    );
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <Grid
        mb={20}
        w="100vw"
        overflowY="scroll"
        templateColumns="repeat(2, 2fr)"
        gap={2}
        p={2}
        justifyContent="center"
        alignItems="center"
        sx={scrolllBarCategoryList}
      >
        {data?.categories.map((item, index) => (
          <AppCategoryItem key={index} name={item.name} imgUrl={item.imgUrl} />
        ))}
      </Grid>
    </>
  );
};

export default AppCategoryList;
