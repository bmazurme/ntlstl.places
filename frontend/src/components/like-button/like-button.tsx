import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { BiSolidHeart, BiHeart } from '../../utils/icons/bi';
import { useChangeLikeMutation, useGetCardsByUserMutation } from '../../store';

import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  card: Card;
}

export default function LikeButton({ user, card }: ILikeProps) {
  const { id } = useParams();
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();
  const [getCards] = useGetCardsByUserMutation();

  const onCardLike = async (c: Card) => {
    try {
      await changeLike({
        cardId: c.id,
        value: c.isliked,
      });

      if (id) {
        await getCards(id);
      }
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
