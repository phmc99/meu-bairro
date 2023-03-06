import { Flex, Image } from '@chakra-ui/react';

const AppHeader = () => {
  return (
    <Flex w="100%" h="55px" p="5px" justifyContent="center" bgColor="#f3f3f3">
      <Image
        maxW="150px"
        w="100%"
        maxH="50px"
        h="100%"
        src="./logo-meu-bairro.png"
        alt="logo"
        pointerEvents="none"
      />
    </Flex>
  );
};

export default AppHeader;
