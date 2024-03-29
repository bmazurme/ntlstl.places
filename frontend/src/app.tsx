import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import SignInPage from './pages/signin-page';
import OauthPage from './pages/oauth-page';
import MainPage from './pages/main-page';
import TagsPage from './pages/tags-page';
import UsersPage from './pages/users-page';
import UserPage from './pages/user-page';
import UserEditModal from './pages/user-edit-modal-page';
import NotFoundPage from './pages/404';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import { Urls } from './utils/constants';

import ThemeContext from './context/theme-context';
import useDarkTheme from './hooks/use-dark-theme';

export default function App() {
  const location = useLocation();
  const { state } = location as unknown as { state: { pathname: string | null } };
  const { providerValue } = useDarkTheme();

  useEffect(() => {
    location.state = null;
  }, []);

  return (
    <ThemeContext.Provider value={providerValue}>
      <ErrorBoundaryWrapper>
        <Routes location={state?.pathname || location}>
          <Route path={Urls.BASE} element={(<MainPage />)} />
          <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
          <Route path={Urls.OAUTH.INDEX} element={(<OauthPage />)} />
          <Route path={Urls.TAGS.INDEX} element={(<TagsPage />)} />
          <Route path={Urls.USERS.INDEX} element={(<UsersPage />)} />
          <Route path={Urls.USERS.CURRENT} element={(<UserPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>
        {state?.pathname
        && (
        <Routes>
          <Route path={Urls.USERS.CURRENT_EDIT} element={(<UserEditModal />)} />
        </Routes>
        )}
      </ErrorBoundaryWrapper>
    </ThemeContext.Provider>
  );
}
