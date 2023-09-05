import React from 'react';

import Profile from '../../components/profile';
import Cards from '../../components/cards';
import Preloader from '../../components/preloader';
import useUser from '../../hooks/use-user';

import { useGetCardsQuery } from '../../store';

export default function MainLayout() {
  const user = useUser();
  const { isLoading: isLoadingCards } = useGetCardsQuery();

  return (
    <>
      {user && <Profile />}
      {isLoadingCards ? <Preloader /> : <Cards />}
    </>
  );
}
