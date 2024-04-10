/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Link } from 'react-router-dom';

import { useUpdateCardMutation } from '../../store';

import Image from '../image';
import LikeButton from '../like-button';
import RemoveButton from './components/remove-button';

import useFormWithValidation from '../../hooks/use-form-with-validation';
import useUser from '../../hooks/use-user';
import { Urls } from '../../utils/constants';

import style from '../card/card.module.css';
import inputstyle from './card.module.css';

export default function Card({ card, index }: { card: Card; index: number; }) {
  const user = useUser();
  const errorHandler = useErrorHandler();
  const [updateCard] = useUpdateCardMutation();
  const { values, handleChange, resetForm } = useFormWithValidation({ name: card.name });

  const onSubmit = async () => {
    try {
      if (user?.id === card.userid) {
        if (values.name !== '') {
          await updateCard({ name: values.name, id: card.id });
        } else {
          resetForm({ name: card.name });
        }
      }
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <div className={style.card}>
      {user && <RemoveButton card={card} user={user} />}
      <Image card={card} index={index} />
      <div className={style.group}>
        <form className={style.box}>
          {user?.id === card.userid
            ? (
              <>
                <label
                  htmlFor="text"
                  className={inputstyle.label}
                >
                  Title:
                </label>
                <input
                  id="text"
                  className={inputstyle.input}
                  type="text"
                  name="name"
                  readOnly={user?.id !== card.userid}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={onSubmit}
                />
              </>
            )
            : <h2 className={style.name}>{card.name}</h2>}
          <Link to={`${Urls.USERS.INDEX}/${card.userid}`} className={style.user}>
            {card.username}
          </Link>
        </form>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
}
