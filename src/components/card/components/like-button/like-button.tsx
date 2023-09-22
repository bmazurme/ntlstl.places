import React from 'react';
import classNames from 'classnames';
import { useErrorHandler } from 'react-error-boundary';

import { useChangeLikeMutation, useGetLikesQuery } from '../../../../store';

import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  card: Card;
}

type TypeLike = {
  id: string;
  user_id: string;
  card_id: string;
};

export default function LikeButton({ user, card }: ILikeProps) {
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();
  const { data: likes = [] } = useGetLikesQuery({ cardId: card.id });
  const isLiked = likes.some((like: any) => like.user_id === user?.id);

  const onCardLike = async (c: Card) => {
    try {
      await changeLike({
        cardId: c.id,
        value: likes.some((u: TypeLike) => u.user_id === user?.id),
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
      <p className={style.counter}>{likes.length}</p>
    </div>
  );
}
