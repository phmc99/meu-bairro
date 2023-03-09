import { Button, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AppActionButtonProps {
  children: ReactNode;
  action: () => void;
  disabled?: boolean;
}

const AppActionButton = ({
  children,
  action,
  disabled
}: AppActionButtonProps) => {
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
        disabled={disabled ? true : false}
      >
        <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
          {children}
        </Text>
      </Button>
    </>
  );
};

export default AppActionButton;
