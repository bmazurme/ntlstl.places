import React, { useCallback, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../card';
// import MoreButton from '../more-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  cardsSelector, setCards, useGetCardByIdMutation, // currentSelector,
} from '../../store';

// import { SHIFT } from '../../utils/constants';

import style from './cards.module.css';

export default function Cards() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  // const current = useAppSelector(currentSelector);
  const [getCards] = useGetCardByIdMutation();
  const [nextPageUrl, setNextPageUrl] = useState<any>(300);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    dispatch(setCards([...cards]));
  }, []);

  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      setFetching(true);

      try {
        const { data } = await getCards(nextPageUrl) as { data: Card };

        if (data) {
          // dispatch(setCards([...cards, data]));
        }

        if (data?.id) {
          setNextPageUrl(nextPageUrl + 1);
        } else {
          setNextPageUrl(null);
        }
      } finally {
        setFetching(false);
      }
    },
    [cards, fetching, nextPageUrl],
  );

  const hasMoreItems = !!nextPageUrl;

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );
  // const dispatch = useAppDispatch();
  // const cards = useAppSelector(cardsSelector);
  // const current = useAppSelector(currentSelector);
  // const onMore = () => {
  //   dispatch(setCurrent([...current, ...cards.slice(current.length, current.length + SHIFT)]));
  // };

  return (
    <InfiniteScroll
      loadMore={fetchItems}
      hasMore={hasMoreItems}
      loader={loader}
    >
      <section className={style.cards}>
        {cards.map((card: Card, i: number) => (<Card key={card?.id} card={card} index={i} />))}
      </section>
    </InfiniteScroll>
  );
}
