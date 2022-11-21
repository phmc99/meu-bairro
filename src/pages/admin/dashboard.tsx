import Router from 'next/router';
import { useEffect } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import CommerceList from '../../components/CommerceList';

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    token ? Router.push('/admin/dashboard') : Router.push('/admin/login');
  }, []);

  return (
    <Flex height="100vh" justifyContent="center">
      <Flex direction="column" width={'100%'} p={10}>
        <Button colorScheme="blue" width={120}>
          Adicionar
        </Button>
        <Heading>Comercios</Heading>
        <CommerceList />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
