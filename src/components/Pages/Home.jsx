import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Videos from '../Videos';

const Home = () => {
  const {name} = useAuth();

  return <Videos />
}

export default Home;