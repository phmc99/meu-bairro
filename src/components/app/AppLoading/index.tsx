import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { animation } from './animation';

const AppLoading = () => {
  const handleBack = () => {
    window.location.href = '/app';
  };
  return (
    <Flex
      w="100%"
      h="60vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      opacity={0.9}
    >
      <Box as={motion.div} animation={animation}>
        <Image src="/icone-meubairro.png" />
      </Box>
      <Button onClick={handleBack} mt={10} variant="link" color="gray.200">
        Voltar
      </Button>
    </Flex>
  );
};

export default AppLoading;
