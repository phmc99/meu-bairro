import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea
} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { useState } from 'react';

const AppFeedbackModal = () => {
  const [rate, setRate] = useState<number>(3);
  const ratingChanged = (newRating: any) => {
    setRate(newRating);
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Avalie esse comércio</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl my={2}>
            <FormLabel>Comentário</FormLabel>
            <Textarea placeholder="Digite um comentário sobre o comércio!" />
          </FormControl>
          <Flex gap={2} textAlign="left" direction="column">
            <Text fontWeight={500}>Nota</Text>
            <StarRatings
              rating={rate}
              starRatedColor="#ECC94B"
              starHoverColor="#ffda54"
              changeRating={ratingChanged}
              numberOfStars={5}
              name="rating"
              starDimension="24px"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default AppFeedbackModal;
