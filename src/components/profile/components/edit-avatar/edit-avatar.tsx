import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { Button, InputField } from '../../../form-components';

import style from './edit-avatar.module.css';

type FormPayload = { avatar: string; };

const inputs = [
  {
    name: 'avatar',
    label: 'Url picture',
    pattern: {
      value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\\/]))?/,
      message: 'Url is invalid',
    },
    required: true,
    autoComplete: 'current-avatar',
  },
];

export default function EditAvatar({ info, isLoading, onUpdateUser }
: { info: User | null; isLoading: boolean; onUpdateUser: (data: { avatar: string; }) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? {
      avatar: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className={style.title}>Обновить аватар</h2>
      {inputs.map((input) => (
        <Controller
          key={input.name}
          name={input.name as keyof FormPayload}
          rules={{
            pattern: input.pattern,
            required: input.required,
          }}
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              {...input}
              black
              errorText={fieldState.error?.message}
            />
          )}
        />
      ))}
      <Button className={style.submit} variant="filled">
        {buttonText}
      </Button>
    </form>
  );
}
