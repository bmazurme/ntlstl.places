/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';
import AvatarEditor from 'react-avatar-editor';
import {
  FaRotateLeft, FaRotateRight, FaPlus, FaMinus,
} from 'react-icons/fa6';

import UploadButton from '../../../upload-button';
import { Button } from '../../../form-components';

import style from './edit-avatar.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormPayload = { avatar: any; };

export default function EditAvatar({
  isLoading, info, updateUserAvatar,
}: { isLoading: boolean; info: User | null; updateUserAvatar: (data: FormData) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { handleSubmit } = useForm<FormPayload>();
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [editor, setEditor] = useState<File | string | null>(null);
  const [editor2, setEditor2] = useState<AvatarEditor | null>(null);
  const setEditorRef = (ed: AvatarEditor) => (setEditor2(ed));

  const onSubmit = handleSubmit(async () => {
    try {
      const form = new FormData();

      if (editor2) {
        const canvasScaled = editor2!.getImageScaledToCanvas();
        const dt = canvasScaled.toDataURL('image/jpeg');
        const res = await fetch(dt);
        const blob = await res.blob();
        form.append('files', blob);
      }

      updateUserAvatar(form);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  const setAvatar = async () => {
    const res = await fetch(`http://localhost:4000/files/avatar/${info?.avatar}`);
    const blob = await res.blob();
    const objectURL = URL.createObjectURL(blob);
    setEditor(objectURL);
  };

  const onClickPlus = () => setRotate(rotate + 90 === 360 ? 0 : rotate + 90);
  const onClickMinus = () => setRotate(rotate - 90 === 0 ? 0 : rotate - 90);

  const onClickScalePlus = () => setScale(scale + 0.1 === 1.5 ? 1.5 : scale + 0.1);
  const onClickScaleMinus = () => setScale(scale - 0.1 === 0.5 ? 0.5 : scale - 0.1);

  useEffect(() => {
    setAvatar();
  }, []);

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className={style.title}>Update avatar</h2>
      {editor && (
        <div className={style.editor}>
          <AvatarEditor
            ref={setEditorRef}
            image={editor}
            width={260}
            height={260}
            border={20}
            borderRadius={130}
            color={[0, 0, 0, 0.4]} // RGBA
            scale={scale}
            rotate={rotate}
          />
        </div>

      )}
      <div className={style.icons}>
        <UploadButton setEditor={setEditor} />
        <button className={style.icon} type="button" onClick={onClickPlus}>
          <FaRotateRight />
        </button>
        <button className={style.icon} type="button" onClick={onClickMinus}>
          <FaRotateLeft />
        </button>
        <button className={style.icon} type="button" onClick={onClickScalePlus}><FaPlus /></button>
        <button className={style.icon} type="button" onClick={onClickScaleMinus}><FaMinus /></button>
      </div>
      {/* <Controller
        control={control}
        name="avatar"
        render={({ field }) => <>field</>}
      /> */}
      <Button className={style.submit} variant="filled">
        {buttonText}
      </Button>
    </form>
  );
}
