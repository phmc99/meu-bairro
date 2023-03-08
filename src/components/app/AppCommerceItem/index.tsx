import { Avatar, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

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
    <ListItem
      w="95%"
      my={2}
      mx="auto"
      id={id}
      background="#f3f3f3"
      p={3}
      borderRadius={10}
    >
      <Flex alignItems="center" gap={2}>
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
    </ListItem>
  );
};

export default AppCommerceItem;
