import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';

interface AppCommerceItemProps {
  id: string;
  logo: string;
  name: string;
  category: string;
  neighborhood: string;
}

const AppCommerceItem = ({
  id,
  logo,
  name,
  category,
  neighborhood
}: AppCommerceItemProps) => {
  return (
    <Flex
      id={id}
      w="95%"
      alignItems="center"
      gap={5}
      bgColor="#f3f3f3"
      my={2}
      mx="auto"
      p={3}
      borderRadius={10}
      textAlign="left"
    >
      <Avatar size="lg" src={logo} />
      <Flex direction="column">
        <Heading
          size="md"
          fontWeight={600}
          width={[200, 400]}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {name}
        </Heading>
        <Text fontSize="sm">{`${category}, ${neighborhood}`}</Text>
      </Flex>
    </Flex>
  );
};

export default AppCommerceItem;
