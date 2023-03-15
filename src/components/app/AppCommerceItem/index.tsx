import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const handleChangeToCommercePage = () => {
    router.push(`/app/commerce/${id}`);
  };
  category = category.charAt(0).toUpperCase() + category.slice(1);
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
      onClick={handleChangeToCommercePage}
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
