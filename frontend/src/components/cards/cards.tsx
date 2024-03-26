import React from 'react';
import classNames from 'classnames';
import { BiChevronDown } from '../../utils/bi';

import Card from '../card';
import Modal from '../modal';
import Slide from '../slide';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  cardSelector, setCard, cardsSelector, currentSelector, setCurrent,
} from '../../store';

import { SHIFT } from '../../utils/constants';

import style from './cards.module.css';

function More({ handler, disabled }: { handler: () => void; disabled: boolean }) {
  return (
    <button
      aria-label="Add"
      className={classNames(style.add, { [style.disabled]: disabled })}
      disabled={disabled}
      type="button"
      onClick={handler}
    >
      <BiChevronDown size={36} />
    </button>
  );
}

export default function Cards() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const selectedCard = useAppSelector(cardSelector);
  const current = useAppSelector(currentSelector);
  const onMore = () => {
    dispatch(setCurrent([...current, ...cards.slice(current.length, current.length + SHIFT)]));
  };

  return (
    <div className={style.container}>
      <section className={style.cards}>
        {current.map((card, i) => (<Card key={card.id} card={card} index={i} />))}
        {selectedCard && (<Modal children={<Slide />} onClose={() => dispatch(setCard(null))} />)}
      </section>
      {cards.length > SHIFT
        && (<More handler={onMore} disabled={current.length >= cards.length} />)}
    </div>
  );
}
