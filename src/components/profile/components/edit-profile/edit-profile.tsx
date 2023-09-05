import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { Button, InputField } from '../../../form-components';

import style from './edit-profile.module.css';

type FormPayload = {
  name: string;
  about: string;
};

const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'current-name',
  },
  {
    name: 'about',
    label: 'About',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'About is invalid',
    },
    required: true,
    type: 'about',
    autoComplete: 'current-about',
  },
];

export default function EditProfile({ info, isLoading, onUpdateUser }
: { info: User | null; isLoading: boolean; onUpdateUser: (data: FormPayload) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? {
      name: '',
      about: '',
    },
  });

  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      await onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className={style.title}>Update profile</h2>
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
