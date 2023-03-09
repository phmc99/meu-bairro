import { useState } from 'react';
import AppCommerceItem from '../../../../components/app/AppCommerceItem';
import AppCommerceList from '../../../../components/app/AppCommerceList';
import NavigationHeader from '../../../../components/app/NavigationHeader';

const NewCommerce = () => {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [counter, setCounter] = useState(0);

  const fetchMoreData = () => {
    setItems([
      ...items,
      {
        id: counter * 13,
        logo: 'https://picsum.photos/2560',
        name: `Comércio ${counter * 13}`,
        category: 'Comércio',
        neighborhood: 'Del Castilho'
      }
    ]);
    setCounter(counter + 1);

    if (counter === 10) {
      setHasMore(false);
    }
  };

  return (
    <>
      <NavigationHeader title="Chegaram agora" />
      <AppCommerceList
        fetchMoreData={fetchMoreData}
        dataLength={items.length}
        hasMore={hasMore}
      >
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
        <AppCommerceItem
          id="9"
          logo="https://picsum.photos/2560"
          name="Comércio 9"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="10"
          logo="https://picsum.photos/2560"
          name="Comércio 10"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        <AppCommerceItem
          id="11"
          logo="https://picsum.photos/2560"
          name="Comércio 11"
          category="Comércio"
          neighborhood="Del Castilho"
        />
        {items.map((item: any) => (
          <AppCommerceItem
            key={item.id}
            id={item.id}
            logo={item.logo}
            name={item.name}
            category={item.category}
            neighborhood={item.neighborhood}
          />
        ))}
      </AppCommerceList>
    </>
  );
};

export default NewCommerce;
