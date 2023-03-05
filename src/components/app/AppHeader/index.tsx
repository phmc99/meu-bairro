import { Flex, Image } from '@chakra-ui/react';

const AppHeader = () => {
  return (
    <Flex w="100%" h="55px" p="5px" justifyContent="center" bgColor="#f3f3f3">
      <Image src="./header-logo.png" alt="logo" pointerEvents="none" />
    </Flex>
  );
};

export default AppHeader;
