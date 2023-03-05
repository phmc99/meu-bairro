import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

interface DeleteModalProps {
  deleteCommerce: () => Promise<any>;
}

const DeleteModal = ({ deleteCommerce }: DeleteModalProps) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deletar Comércio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Tem certeza que deseja deletar esse comércio?</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={deleteCommerce}>
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default DeleteModal;
