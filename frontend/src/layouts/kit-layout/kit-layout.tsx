/* eslint-disable no-undef */
import React from 'react';
import { FaEye } from 'react-icons/fa';

// import UploadButton from '../../components/upload-button';

import style from './kit-layout.module.css';

export default function NotFoundLayout() {
  return (
    <div className={style.container}>
      {/* <UploadButton onChange={(formData: FormData) => console.log(formData)} /> */}
      <div className={style.counter}>
        <div className={style.icon}>
          <FaEye />
        </div>
        <span className={style.value}>0</span>
      </div>
    </div>
  );
}
