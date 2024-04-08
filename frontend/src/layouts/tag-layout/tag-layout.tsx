import React from 'react';
import { useParams } from 'react-router-dom';

import Board from '../../components/board';
import Preloader from '../../components/preloader';
import Cards from '../../components/cards';

import { useGetCardsByTagQuery } from '../../store';

export default function TagLayout() {
  const params = useParams();
  const { isLoading: isLoadingCards } = useGetCardsByTagQuery(params.id!);

  return (<Board children={isLoadingCards ? <Preloader /> : <Cards />} title={params.id} />);
}
