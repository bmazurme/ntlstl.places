import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Modal from '../../../modal';
import EditAvatar from '../edit-avatar';
import { useUpdateUserAvatarMutation } from '../../../../store';

import style from './avatar-button.module.css';

type AvatarProps = {
  popup: { profile: boolean; avatar: boolean; place: boolean; };
  setPopup: (p: { profile: boolean; avatar: boolean; place: boolean; }) => void;
  info: User | null;
};

export default function AvatarButton({ info, popup, setPopup }: AvatarProps) {
  const errorHandler = useErrorHandler();
  const [updateUserAvatar, { isLoading: isLoadingAvatar }] = useUpdateUserAvatarMutation();
  const handleOpenEditAvatarPopup = () => setPopup({ ...popup, avatar: true });
  const handleCloseAllPopups = () => setPopup({ profile: false, avatar: false, place: false });

  const handleUpdateAvatarSubmit = async (data: Record<string, string>) => {
    try {
      await updateUserAvatar(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      <div
        className={style.image}
        style={{ backgroundImage: `url(/api/files/avatar/${info?.avatar})` }}
        onClick={handleOpenEditAvatarPopup}
        aria-hidden="true"
      />
      {popup.avatar
        && (
        <Modal
          onClose={handleCloseAllPopups}
          children={(
            <EditAvatar
              isLoading={isLoadingAvatar}
              info={info}
              updateUserAvatar={handleUpdateAvatarSubmit}
            />
          )}
        />
        )}
    </>
  );
}
