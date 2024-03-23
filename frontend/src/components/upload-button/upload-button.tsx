/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { FaCloudUploadAlt } from 'react-icons/fa';

import style from './upload-button.module.css';

export default function UploadButton({ setEditor }
  : { setEditor: (file: File | string | null) => void; }) {
  const elementInputFile = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const onInputChange = useCallback(async (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    const validateImgFile = (file: File | undefined) => !!file?.type.match('image.*');

    if (!files?.[0] || !validateImgFile(files[0])) {
      return;
    }

    const file = files[0];
    setName(file.name);
    setEditor(file);
  }, []);

  return (
    <div className={style.container}>
      <label className={classNames(style.upload)} htmlFor="file">
        <input
          ref={elementInputFile}
          type="file"
          onChange={onInputChange}
          id="file"
          className={classNames(style.input)}
        />
        <FaCloudUploadAlt />
      </label>
      <span className={classNames(style.link)}>{name}</span>
    </div>
  );
}
