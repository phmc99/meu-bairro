import {
  Avatar,
  Flex,
  Heading,
  ListItem,
  Modal,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import DeleteModal from '../DeleteModal';
import api from '../../../services/api';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { getCommerces } from '../../../store/commerce';

interface CommerceItemProps {
  id: string;
  logo: string;
  name: string;
}

const CommerceItem = ({ id, logo, name }: CommerceItemProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: AppState) => state.commerce);
  const toast = useToast();

  const deleteCommerce = () => {
    const token = localStorage.getItem('@mb:admin-token');

    if (!token) {
      return Router.push('/admin/login');
    }

    return api
      .delete(`/commerce/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        toast({
          title: 'Comércio deletado',
          description: `${name} foi deletado da plataforma`,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
        onClose();
        dispatch(
          getCommerces(
            `/commerce?page=${data?.page}&per_page=${data?.per_page}`
          )
        );
        return res.data;
      })
      .catch(res => {
        if (res.response.status === 401) {
          localStorage.removeItem('@mb:admin-token');
          Router.push('/admin/login');
          return;
        }
        return res.response.data;
      });
  };

  const handleUpdateCommerce = (id: string) => {
    localStorage.setItem('@mb:current-commerce-id', id);
    Router.push(`/admin/commerce/${id}`);
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <DeleteModal deleteCommerce={deleteCommerce} />
      </Modal>
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
            <EditIcon
              cursor="pointer"
              onClick={() => handleUpdateCommerce(id)}
            />
            <DeleteIcon onClick={onOpen} cursor="pointer" />
          </Flex>
        </Flex>
      </ListItem>
    </>
  );
};

export default CommerceItem;
