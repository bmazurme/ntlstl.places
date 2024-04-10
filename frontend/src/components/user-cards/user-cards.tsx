import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../user-card';
import CardLoader from '../card-loader';

import style from '../cards/cards.module.css';

export default function UserCards({ fetchItems, hasMoreItems, cards }
  : { fetchItems: () => void; hasMoreItems: boolean; cards: Card[]; }) {
  return (
    <InfiniteScroll
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
