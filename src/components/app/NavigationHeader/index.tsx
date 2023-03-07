import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface NavigationHeaderProps {
  title: string;
}

const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  const router = useRouter();
  return (
    <Flex
      w="100%"
      h="55px"
      p="5px"
      gap={2}
      bgColor="#f3f3f3"
      alignItems="center"
      color="blue.600"
    >
      <IconButton
        colorScheme="blue"
        variant="ghost"
        aria-label="botão de navegação"
        onClick={() => router.back()}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        icon={<ChevronLeftIcon boxSize={6} />}
      />
      <Heading fontWeight={700} size="md">
        {title}
      </Heading>
    </Flex>
  );
};

export default NavigationHeader;
