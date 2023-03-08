import { IconButton, Icon } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { FaHome, FaUserAlt, FaSearch } from 'react-icons/fa';

interface AppNavBarButtonProps {
  type: 'home' | 'user' | 'search';
}

const AppNavBarButton = ({ type }: AppNavBarButtonProps) => {
  const router = useRouter();

  const icons: any = {
    home: FaHome,
    user: FaUserAlt,
    search: FaSearch
  };

  const changePage = () => {
    const path = router.pathname;
    if (type === 'home' && path !== '/app') {
      Router.push(`/app`);
      return;
    }
    if (path !== `/app/${type}` && type !== 'home') {
      Router.push(`/app/${type}`);
      return;
    }
  };

  return (
    <>
      <IconButton
        colorScheme="blue"
        variant="ghost"
        aria-label="botão de navegação"
        onClick={changePage}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        icon={<Icon boxSize={6} as={icons[type]} />}
      />
    </>
  );
};

export default AppNavBarButton;
