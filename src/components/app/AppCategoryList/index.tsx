import { Grid } from '@chakra-ui/react';
import AppCategoryItem from '../AppCategoryItem';
import { scrolllBarCategoryList } from './style';

const AppCategoryList = () => {
  const data: any[] = [
    {
      name: 'Padaria',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/11/200'
    },
    {
      name: 'Mercado',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/12/200'
    },
    {
      name: 'Bar',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/13/200'
    },
    {
      name: 'Barbearia',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/14/200'
    },
    {
      name: 'Lanchonete',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/15/200'
    },
    {
      name: 'Petshop',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/16/200'
    },
    {
      name: 'Lojas',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/17/200'
    },
    {
      name: 'Restaurante',
      description: 'Pão',
      imgUrl: 'https://picsum.photos/id/18/200'
    }
  ];

  return (
    <Grid
      h="65vh"
      w="100vw"
      overflowY="scroll"
      templateColumns="repeat(2, 2fr)"
      gap={2}
      p={2}
      justifyContent="center"
      alignItems="center"
      sx={scrolllBarCategoryList}
    >
      {data.map((item, index) => (
        <AppCategoryItem key={index} name={item.name} imgUrl={item.imgUrl} />
      ))}
    </Grid>
  );
};

export default AppCategoryList;
