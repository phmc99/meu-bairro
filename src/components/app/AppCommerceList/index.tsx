import { List } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { scrollBarStyle } from '../../admin/CommerceList/style';

interface AppCommerceListProps {
  children: ReactNode;
}

const AppCommerceList = ({ children }: AppCommerceListProps) => {
  return (
    <List overflowY="scroll" h="80vh" sx={scrollBarStyle}>
      {children}
    </List>
  );
};

export default AppCommerceList;
