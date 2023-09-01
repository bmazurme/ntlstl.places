import React from 'react';
import classNames from 'classnames';
import { useErrorHandler } from 'react-error-boundary';

import { useChangeLikeMutation } from '../../../../store';

import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  card: Card;
}

export default function LikeButton({ user, card }: ILikeProps) {
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();
  const isLiked = card.likes.some((like: string) => like === user?._id);

  const onCardLike = async (c: Card) => {
    try {
      await changeLike({
        cardId: c._id,
        value: c.likes.some((u) => u === user?._id),
      });
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
        className={classNames(
          style.button,
          { [style.checked]: isLiked },
          { [style.disabled]: !user },
        )}
        name="button-like"
        disabled={!user}
      />
      <p className={style.counter}>{card.likes.length}</p>
    </div>
  );
}
