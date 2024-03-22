import React from 'react';
import { BiLogoTelegram, BiLogoLinkedin } from 'react-icons/bi';

import style from './footer.module.css';

export default function Footer() {
  const getYear = () => (new Date().getFullYear().toString());

  return (
    <footer className={style.footer}>
      <p className={style.copyright}>
        &copy;
        {` ${getYear()} mesto by `}
        <a className={style.link} href="https://ntlstl.dev/">[ntlstl]</a>
      </p>
      <ul className={style.items}>
        <li className={style.item}>
          <a className={style.contact} href="https://t.me/ntlstl">
            <span className={style.icon}>
              <BiLogoTelegram size={18} />
            </span>
            Telegram
          </a>
        </li>
        <li className={style.item}>
          <a className={style.contact} href="https://www.linkedin.com/in/bogdan-mazur-aba74287">
            <span className={style.icon}>
              <BiLogoLinkedin size={18} />
            </span>
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}
