import { Flex, GridItem, Heading } from '@chakra-ui/react';

interface ApppCategoryItemProps {
  name: string;
  imgUrl: string;
}

const AppCategoryItem = ({ name, imgUrl }: ApppCategoryItemProps) => {
  return (
    <GridItem w="100%" h={180} borderRadius={10}>
      <Flex
        bgColor="black"
        w="100%"
        h="100%"
        bgImage={`url(${imgUrl})`}
        borderRadius={10}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          bgColor="blackAlpha.500"
          borderRadius={10}
        >
          <Heading color="whiteAlpha.800">{name}</Heading>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default AppCategoryItem;
