import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Profile from '../../components/profile';
import Cards from '../../components/cards';
import Preloader from '../../components/preloader';
import useUser from '../../hooks/use-user';

import { useGetCardsQuery } from '../../store';

export default function MainLayout() {
  const user = useUser();
  const handleError = useErrorHandler();
  const { isError: cardsError, isLoading: isLoadingCards } = useGetCardsQuery();

  if (cardsError) {
    handleError(cardsError);
  }

  return (
    <>
      {user && <Profile />}
      {isLoadingCards ? <Preloader /> : <Cards />}
    </>
  );
}
