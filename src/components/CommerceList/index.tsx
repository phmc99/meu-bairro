import { List, Progress } from '@chakra-ui/react';
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
    dispatch(getCommerces());
  }, [dispatch]);

  return (
    <List overflowY="scroll" spacing={2} sx={scrollBarStyle}>
      {loading && <Progress size="xs" isIndeterminate />}
      {loading === false &&
        data.map(({ name, _id, logo }) => (
          <CommerceItem logo={logo} id={_id} name={name} key={_id} />
        ))}
    </List>
  );
};

export default CommerceList;
