import { Flex, IconButton, Input } from '@chakra-ui/react';
import { MdSearch, MdSearchOff } from 'react-icons/md';

interface AppSearchInputProps {
  value: string;
  setValue: any;
  handleSearch: () => void;
  handleClearSearch: () => void;
}

const AppSearchInput = ({
  value,
  setValue,
  handleSearch,
  handleClearSearch
}: AppSearchInputProps) => {
  return (
    <Flex w="90%" m="0 auto" p={3}>
      <IconButton
        aria-label="Clear search"
        icon={<MdSearchOff size={22} />}
        variant="link"
        ml={2}
        onClick={handleClearSearch}
      />
      <Input
        placeholder="Digite sua pesquisa aqui..."
        borderRadius={0}
        borderLeftRadius={5}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<MdSearch size={22} />}
        borderRadius={0}
        borderRightRadius={5}
        w={20}
        onClick={handleSearch}
      />
    </Flex>
  );
};

export default AppSearchInput;
