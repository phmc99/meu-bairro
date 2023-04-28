import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Flex, Heading, List, Progress } from '@chakra-ui/react';

import CommerceItem from '../CommerceItem';
import { scrollBarStyle } from './style';
import { ICommerceResponse } from '../../../types';

interface SearchResultListProps {
  data: ICommerceResponse;
  handleSearch: (page: any) => Promise<ICommerceResponse>;
  loading: boolean;
}

const SearchResultList = ({
  data,
  handleSearch,
  loading
}: SearchResultListProps) => {
  const handleChangePage = async (page: any) => {
    if (page != null) {
      await handleSearch(page);
    }
  };

  return (
    <>
      <List overflowY="scroll" spacing={2} sx={scrollBarStyle}>
        {loading && <Progress size="xs" isIndeterminate />}
        {data?.data != null &&
          loading === false &&
          data.data.map(({ name, _id, logo }) => (
            <CommerceItem logo={logo} id={_id} name={name} key={_id} />
          ))}
      </List>
      <Flex mt={2} justifyContent="center" gap={[4, 2]}>
        <ArrowLeftIcon
          onClick={() => handleChangePage(data?.previous_page)}
          cursor="pointer"
        />
        <Heading as="h3" size="xs">
          {data?.page}
        </Heading>
        <ArrowRightIcon
          cursor="pointer"
          onClick={() => handleChangePage(data?.next_page)}
        />
      </Flex>
    </>
  );
};

export default SearchResultList;
