/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import Cards from '../../components/cards';
import Preloader from '../../components/preloader';

import { useGetCardsQuery } from '../../store';

export default function MainLayout() {
  const { isLoading: isLoadingCards } = useGetCardsQuery();

  return (
    <>
      {isLoadingCards ? <Preloader /> : <Cards />}
    </>
  );
}
