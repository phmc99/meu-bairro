import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  UseDisclosureProps
} from '@chakra-ui/react';
import AppCommerceAddress from '../AppCommerceAddress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { getLocation } from '../../../store/app/location';

const AppChangeAddressForm = ({
  isOpen,
  onClose
}: Required<UseDisclosureProps>) => {
  const { address, loading } = useSelector((state: AppState) => state.location);
  const dispatch = useDispatch<AppDispatch>();

  const handleGetLocation = () => {
    let cords = JSON.parse(localStorage.getItem('@mb:user-cords') || '{}');

    if (!cords.lat && !cords.lng) {
      navigator.geolocation.getCurrentPosition(postion => {
        cords = {
          lat: postion.coords.latitude,
          lng: postion.coords.longitude
        };
        localStorage.setItem('@mb:user-cords', JSON.stringify(cords));
        dispatch(getLocation(cords));
      });
    }

    if (cords.lat && cords.lng) {
      dispatch(getLocation(cords));
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="95%">
          <ModalHeader>Atualizar endereço</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center">
            <Skeleton isLoaded={!loading}>
              <AppCommerceAddress address={address} />
            </Skeleton>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              justifyContent="center"
              mr={2}
              onClick={handleGetLocation}
              isLoading={loading}
            >
              Buscar
            </Button>
            <Button isLoading={loading} onClick={onClose} colorScheme="blue">
              Feito
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppChangeAddressForm;
