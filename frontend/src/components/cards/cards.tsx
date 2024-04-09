/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../card';
import CardLoader from '../card-loader';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { cardsSelector, setCards, useGetCardsByPageMutation } from '../../store';

import style from './cards.module.css';

export default function Cards() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const [getCards, { isLoading }] = useGetCardsByPageMutation();
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(1);
  const [fetching, setFetching] = useState(false);

  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      setFetching(true);
      const { data } = await getCards(`${nextPageUrl}`) as any;

      setNextPageUrl(data && data.length > 0 && nextPageUrl ? nextPageUrl + 1 : null);
      setFetching(false);
    },
    [isLoading, nextPageUrl, cards],
  );

  const hasMoreItems = !!nextPageUrl;

  useEffect(() => {
    dispatch(setCards([]));
    setNextPageUrl(1);
  }, [params.id]);

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchItems}
      hasMore={hasMoreItems}
      loader={<CardLoader key="loader" />}
    >
      <section className={style.cards}>
        {cards.map((card, i) => (<Card key={card?.id} card={card} index={i} />))}
      </section>
    </InfiniteScroll>
  );
}
