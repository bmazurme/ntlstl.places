import React from 'react';

import Card from '../card';
import MoreButton from '../more-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  cardsSelector, currentSelector, setCurrent,
} from '../../store';

import { SHIFT } from '../../utils/constants';

import style from './cards.module.css';

export default function Cards() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const current = useAppSelector(currentSelector);
  const onMore = () => {
    dispatch(setCurrent([...current, ...cards.slice(current.length, current.length + SHIFT)]));
  };

  return (
    <>
      <section className={style.cards}>
        {current.map((card, i) => (<Card key={card.id} card={card} index={i} />))}
      </section>
      {cards.length > SHIFT
        && (<MoreButton handler={onMore} disabled={current.length >= cards.length} />)}
    </>
  );
}
