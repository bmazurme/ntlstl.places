import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignInPage from './pages/signin-page';
import OauthPage from './pages/oauth-page';
import MainPage from './pages/main-page';
import TagsPage from './pages/tags-page';
import UsersPage from './pages/users-page';
import UserPage from './pages/user-page';
import CardPage from './pages/card-page';
import CardModalPage from './pages/card-modal-page';
import UserEditModalPage from './pages/user-edit-modal-page';
import NotFoundPage from './pages/404';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import { Urls } from './utils/constants';

import ThemeContext from './context/theme-context';
import useDarkTheme from './hooks/use-dark-theme';
import { useAppLocation } from './hooks/use-app-location';

export default function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;
  const { providerValue } = useDarkTheme();

  return (
    <ThemeContext.Provider value={providerValue}>
      <ErrorBoundaryWrapper>
        <Routes location={background || location}>
          <Route path={Urls.BASE} element={(<MainPage />)} />
          <Route path={Urls.CARDS.CURRENT} element={(<CardPage />)} />
          <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
          <Route path={Urls.OAUTH.INDEX} element={(<OauthPage />)} />
          <Route path={Urls.TAGS.INDEX} element={(<TagsPage />)} />
          <Route path={Urls.USERS.INDEX} element={(<UsersPage />)} />
          <Route path={Urls.USERS.CURRENT} element={(<UserPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>
        {background
        && (
        <Routes>
          <Route path={Urls.USERS.CURRENT_EDIT} element={(<UserEditModalPage />)} />
          <Route path={Urls.CARDS.CURRENT} element={(<CardModalPage />)} />
        </Routes>
        )}
      </ErrorBoundaryWrapper>
    </ThemeContext.Provider>
  );
}
