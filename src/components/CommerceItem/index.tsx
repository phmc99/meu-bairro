import { Avatar, Flex, Heading, ListItem } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface CommerceItemProps {
  id: string;
  logo: string;
  name: string;
}

const CommerceItem = ({ id, logo, name }: CommerceItemProps) => {
  return (
    <ListItem id={id} background="gray.100" p={5}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" gap={2}>
          <Avatar src={logo} />
          <Heading
            as="h2"
            size="md"
            width={[200, 400]}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Heading>
        </Flex>
        <Flex alignItems="center" gap={5}>
          <EditIcon cursor="pointer" />
          <DeleteIcon cursor="pointer" />
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default CommerceItem;
