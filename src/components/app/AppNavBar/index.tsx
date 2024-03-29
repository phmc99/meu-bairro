import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AppNavBarButton from '../AppNavBarButton';
import { useState, useEffect } from 'react';

const AppNavBar = () => {
  const router = useRouter();
  const [path, setPath] = useState('');

  useEffect(() => {
    if (router.pathname) {
      setPath(router.pathname);
    }
  }, [router.pathname]);

  return (
    <Flex
      w="100%"
      h="60px"
      p="5px"
      justifyContent="space-evenly"
      alignItems="center"
      bgColor="#f3f3f3"
      boxShadow="0px -5px 15px 0px rgba(0,0,0,0.15)"
      zIndex={2}
      position={'fixed'}
      bottom={0}
      as="nav"
    >
      <AppNavBarButton
        disabled={path === '/app/user' ? true : false}
        type="user"
      />
      <AppNavBarButton disabled={path === '/app' ? true : false} type="home" />
      <AppNavBarButton
        disabled={path === '/app/search' ? true : false}
        type="search"
      />
    </Flex>
  );
};

export default AppNavBar;
