import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import InfiniteScroll from 'react-infinite-scroller';

import Card from '../card';
import CardLoader from '../card-loader';

import style from './cards.module.css';

type CardsType = { fetchItems: () => void; hasMoreItems: boolean; cards: Card[]; };

export default function Cards({ fetchItems, hasMoreItems, cards }: CardsType) {
  return (
    <InfiniteScroll
      loadMore={fetchItems}
      hasMore={hasMoreItems}
      loader={<CardLoader key="loader" />}
    >
      <section className={style.cards}>
        {cards.map((card, i) => (<Card key={uuidv4()} card={card} index={i} />))}
      </section>
    </InfiniteScroll>
  );
}
