import { useRouter } from 'next/router';
import AppNavBar from '../../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../../components/app/NavigationHeader';

const Category = () => {
  const router = useRouter();
  const category = router.query.category;

  // Se category não estiver na lista de categorias, não fazer req

  // useEffect(() => {
  //   if (category === '‎') {
  //     Router.push('/app');
  //     return;
  //   }
  // }, [category]);

  return (
    <>
      <NavigationHeader title={`${category}`} />
      <AppNavBar />
    </>
  );
};

export default Category;
