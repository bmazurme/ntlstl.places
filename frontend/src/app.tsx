import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import SignInPage from './pages/signin-page';
import OauthPage from './pages/oauth-page';
import MainPage from './pages/main-page';
import KitPage from './pages/kit-page/kit-page';
import TagsPage from './pages/tags-page';
import UsersPage from './pages/users-page';
import UserPage from './pages/user-page';
import NotFoundPage from './pages/404';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import { Urls } from './utils/constants';

import ThemeContext from './context/theme-context';
import useDarkTheme from './hooks/use-dark-theme';

export default function App() {
  const location = useLocation();
  const { providerValue } = useDarkTheme();

  useEffect(() => {
    location.state = null;
  }, []);

  return (
    <ThemeContext.Provider value={providerValue}>
      <ErrorBoundaryWrapper>
        <Routes>
          <Route path={Urls.BASE} element={(<MainPage />)} />
          <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
          <Route path={Urls.OAUTH.INDEX} element={(<OauthPage />)} />
          <Route path={Urls.TAGS.INDEX} element={(<TagsPage />)} />
          <Route path={Urls.USERS.INDEX} element={(<UsersPage />)} />
          <Route path={Urls.USERS.CURRENT} element={(<UserPage />)} />
          <Route path={Urls.KIT.INDEX} element={(<KitPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>
      </ErrorBoundaryWrapper>
    </ThemeContext.Provider>
  );
}
