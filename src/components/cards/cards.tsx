import React from 'react';

import Card from '../card';
import Modal from '../modal';
import Slide from '../slide';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { cardSelector, setCard, cardsSelector } from '../../store';

import style from './cards.module.css';

export default function Cards() {
  const cards = useAppSelector(cardsSelector);
  const dispatch = useAppDispatch();
  const selectedCard = useAppSelector(cardSelector);

  return (
    <section className={style.cards}>
      {cards.map((card: Card) => (<Card key={card._id} card={card} />))}
      {selectedCard
        && (<Modal children={<Slide />} onClose={() => dispatch(setCard(null))} />)}
    </section>
  );
}
