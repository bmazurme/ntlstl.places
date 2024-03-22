import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { Button, InputField } from '../../../form-components';
import UploadButton from '../../../upload-button';

import style from './add-card.module.css';

type FormPayload = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
};

const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: {
      value: /^[\s+$.a-zA-Z0-9_-]{3,25}$/,
      message: 'Name is invalid',
    },
    // disabled: false,
    required: true,
    autoComplete: 'current-name',
  },
];

export default function AddCard({ isLoading, onAddPlace }
: { isLoading: boolean; onAddPlace: (data: FormData) => void; }) {
  const errorHandler = useErrorHandler();
  const [editor, setEditor] = useState<File | string | null>(null);
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', file: '' },
  });
  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      // data.file.append('name', data.name);
      // onAddPlace(data.file);
      const form = new FormData();

      if (editor) {
        // const canvasScaled = editor2!.getImageScaledToCanvas();
        // const dt = canvasScaled.toDataURL('image/jpeg');
        // const res = await fetch(dt);
        // const blob = await res.blob();

        form.append('name', data.name);
        form.append('files', editor);
      }

      onAddPlace(form);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className={style.title}>New place</h2>
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
      {/* <Controller
        control={control}
        name="file"
        render={({ field }) => (<UploadButton onChange={field.onChange} />)}
      /> */}
      <UploadButton setEditor={setEditor} />
      <Button className={style.submit} variant="filled">
        {buttonText}
      </Button>
    </form>
  );
}
