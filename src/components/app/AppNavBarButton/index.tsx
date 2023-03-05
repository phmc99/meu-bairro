import { IconButton, Icon } from '@chakra-ui/react';
import { FaHome, FaUserAlt, FaSearch } from 'react-icons/fa';

interface AppNavBarButtonProps {
  type: 'home' | 'user' | 'search';
}

const AppNavBarButton = ({ type }: AppNavBarButtonProps) => {
  const icons: any = {
    home: FaHome,
    user: FaUserAlt,
    search: FaSearch
  };
  return (
    <>
      <IconButton
        colorScheme="blue"
        variant="outline"
        aria-label="botão de navegação"
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        icon={<Icon as={icons[type]} />}
      />
    </>
  );
};

export default AppNavBarButton;
