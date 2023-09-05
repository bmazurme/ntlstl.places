import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { Button, InputField } from '../../../form-components';
import UploadButton from '../../../upload-button';

import style from './add-place.module.css';

type FormPayload = {
  name: string;
  file: any;
};

const inputs = [
  {
    name: 'name',
    label: 'Название',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'current-name',
  },
];

export default function AddPlace({ isLoading, onAddPlace }
: { isLoading: boolean; onAddPlace: (data: FormPayload) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', file: '' },
  });

  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      data.file.append('name', data.name);
      await onAddPlace(data.file);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className={style.title}>Новое место</h2>
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
      <Controller
        control={control}
        name="file"
        render={({ field }) => (<UploadButton onChange={field.onChange} />)}
      />
      <Button className={style.submit} variant="filled">
        {buttonText}
      </Button>
    </form>
  );
}
