import React from 'react';

import style from './footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.copyright}>
        &copy;
        {' '}
        {'2023 mesto by '}
        <a className={style.link} href="https://ntlstl.dev/">[ntlstl]</a>
        {' v.0'}
      </p>
    </footer>
  );
}
