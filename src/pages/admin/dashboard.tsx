import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { resetAuth } from '../../store/admin';
import api from '../../services/api';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [Categories, setCategories] = useState<any[]>([]);

  const getCategories = (tk: string | null) => {
    api
      .get('/category', {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      })
      .then(res => {
        setCategories(res.data.categories);
      })
      .catch(res => {
        if (res.request.status === 401) {
          dispatch(resetAuth());
          Router.push('/admin/login');
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    token ? Router.push('/admin/dashboard') : Router.push('/admin/login');
    getCategories(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {Categories.length
          ? Categories.map((item, index) => <li key={index}>{item.name}</li>)
          : null}
      </ul>
    </div>
  );
};

export default Dashboard;
