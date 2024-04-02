import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../user-card';
import MoreButton from '../more-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  userCardsSelector, userCurrentSelector,
  setUserCurrent, setUserCards, useGetCardsByUserMutation,
} from '../../store';

import { SHIFT } from '../../utils/constants';

import style from '../cards/cards.module.css';

export default function UserCards() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(userCardsSelector);
  const current = useAppSelector(userCurrentSelector);
  const [getCards, { data = [] }] = useGetCardsByUserMutation();
  const onMore = () => {
    dispatch(setUserCurrent([...current, ...cards.slice(current.length, current.length + SHIFT)]));
  };

  useEffect(() => {
    getCards(id!);
    dispatch(setUserCards(data));
  }, [id]);

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
