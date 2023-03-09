import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input } from '@chakra-ui/react';

const AppSearchInput = () => {
  return (
    <Flex w="90%" m="0 auto" p={3}>
      <Input
        placeholder="Digite sua pesquisa aqui..."
        borderRadius={0}
        borderLeftRadius={5}
        disabled={true}
      />
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<SearchIcon />}
        borderRadius={0}
        borderRightRadius={5}
        disabled={true}
      />
    </Flex>
  );
};

export default AppSearchInput;
