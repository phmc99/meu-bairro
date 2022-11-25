import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Flex, Heading, List, Progress } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import { getCommerces } from '../../store/commerce';
import CommerceItem from '../CommerceItem';
import { scrollBarStyle } from './style';

const CommerceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: AppState) => state.commerce);

  useEffect(() => {
    dispatch(getCommerces('/commerce'));
  }, [dispatch]);

  const handleChangePage = (action: string | null | undefined) => {
    action != null && dispatch(getCommerces(`/commerce${action}`));
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
      <Flex mt={2} justifyContent="center" gap={2}>
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

export default CommerceList;
