import { Button, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AppActionButtonProps {
  children: ReactNode;
  rest?: any;
}

const AppActionButton = ({ children, ...rest }: AppActionButtonProps) => {
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
        {...rest}
      >
        <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
          {children}
        </Text>
      </Button>
    </>
  );
};

export default AppActionButton;
