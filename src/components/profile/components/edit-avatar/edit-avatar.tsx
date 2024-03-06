import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import UploadButton from '../../../upload-button';
import { Button } from '../../../form-components';

import style from './edit-avatar.module.css';

type FormPayload = { avatar: any; };

export default function EditAvatar({
  isLoading, info, updateUserAvatar,
}: { isLoading: boolean; info: User | null; updateUserAvatar: (data: FormPayload) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? { avatar: '' },
  });

  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      updateUserAvatar(data.avatar);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className={style.title}>Update avatar</h2>
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => (<UploadButton onChange={field.onChange} />)}
      />
      <Button className={style.submit} variant="filled">
        {buttonText}
      </Button>
    </form>
  );
}
