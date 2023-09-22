/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from './components/button';
import NavItem from './components/nav-item';
import ThemeButton from './components/theme-button';

import useUser from '../../hooks/use-user';
import { useSignOutMutation } from '../../store';

import { Urls } from '../../utils/constants';

import style from './navbar.module.css';

export default function Navbar({ isOpen, handlerClick }
  : { isOpen: boolean, handlerClick: () => void }) {
  const [signOut] = useSignOutMutation();
  const [email, setEmail] = useState('');
  const user = useUser();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, []);

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <ThemeButton />
      <ul onClick={handlerClick} className={classNames(style.navbar, { [style.opened]: isOpen })} aria-hidden="true">
        {!user && <NavItem to={Urls.SIGNIN} value="Sign in" active="active" />}
        {user?.email && <NavItem to="/" value={email} active="active" />}
        {user?.email && <NavItem to={Urls.SIGNIN} value="Sign Out" onClick={onSignOut} active="" />}
      </ul>
      <Button isOpen={isOpen} handlerClick={handlerClick} />
    </>
  );
}
