import { Flex } from '@chakra-ui/react';
import AppNavBarButton from '../AppNavBarButton';

const AppNavBar = () => {
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
      <AppNavBarButton disabled type="user" />
      <AppNavBarButton type="home" />
      <AppNavBarButton type="search" />
    </Flex>
  );
};

export default AppNavBar;
