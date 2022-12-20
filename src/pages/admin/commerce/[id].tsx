import { useRouter } from 'next/router';

const CommercePage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>CommercePage {router.query.id}</h1>
    </div>
  );
};

export default CommercePage;
