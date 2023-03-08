import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';

const NewCommerce = () => {
  return (
    <>
      <NavigationHeader title="Chegaram agora" />
      <AppCommerceList>
        <AppCommerceItem
          id="1"
          logo="https://picsum.photos/2560"
          name="Comércio 1"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="2"
          logo="https://picsum.photos/2560"
          name="Comércio 2"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="3"
          logo="https://picsum.photos/2560"
          name="Comércio 3"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="4"
          logo="https://picsum.photos/2560"
          name="Comércio 4"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="5"
          logo="https://picsum.photos/2560"
          name="Comércio 5"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="6"
          logo="https://picsum.photos/2560"
          name="Comércio 6"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="7"
          logo="https://picsum.photos/2560"
          name="Comércio 7"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="8"
          logo="https://picsum.photos/2560"
          name="Comércio 8"
          category="Comércio"
          neighborhood="Del Castilho"
        />
      </AppCommerceList>
      <AppNavBar />
    </>
  );
};

export default NewCommerce;
