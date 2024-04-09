import React from 'react';
import classNames from 'classnames';
import { useErrorHandler } from 'react-error-boundary';

import { BiSolidHeart, BiHeart } from '../../utils/icons/bi';
import { useChangeLikeMutation, setLike } from '../../store';
import { useAppDispatch } from '../../hooks';

import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  card: Card;
}

export default function LikeButton({ user, card }: ILikeProps) {
  const dispatch = useAppDispatch();
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();

  const onCardLike = async (c: Card) => {
    try {
      const res: any = await changeLike({
        cardId: c.id,
        value: c.isliked,
      });
      dispatch(setLike(res));
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <div className={style.like}>
      <button
        type="button"
        onClick={() => onCardLike(card)}
        aria-label="Like"
        className={classNames(style.button, { [style.disabled]: !user })}
        name="button-like"
        disabled={!user}
      >
        {card.isliked ? <BiSolidHeart size={24} /> : <BiHeart size={24} />}
      </button>
      <p className={style.counter}>{card.count}</p>
    </div>
  );
}
