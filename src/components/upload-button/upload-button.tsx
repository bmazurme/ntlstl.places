import React, {
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

import style from './upload-button.module.css';

type TypeFileChangerProps = { onChange: (formData: FormData) => void; };

export default function UploadButton({ onChange }: TypeFileChangerProps) {
  const elementInputFile = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    const validateImgFile = (file: File | undefined) => !!file?.type.match('image.*');

    if (!files?.[0]) {
      return;
    }

    if (!validateImgFile(files[0])) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    const form = new FormData();
    form.append('files', files[0]);

    onChange(form);
    setName(files[0].name);
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
        <DocumentArrowUpIcon className="h-3 w-3" />
      </label>
      <span className={classNames(style.link)}>{name}</span>
    </div>
  );
}
