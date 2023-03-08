import { Button, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AppActionButtonProps {
  children: ReactNode;
  action: () => void;
}

const AppActionButton = ({ children, action }: AppActionButtonProps) => {
  return (
    <>
      <Button
        w="80%"
        h="40px"
        colorScheme="blue"
        variant="outline"
        borderRadius={50}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        onClick={action}
      >
        <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
          {children}
        </Text>
      </Button>
    </>
  );
};

export default AppActionButton;
