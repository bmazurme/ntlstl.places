import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeContext from './context/theme-context';
import useDarkTheme from './hooks/use-dark-theme';
import { useAppLocation } from './hooks/use-app-location';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';
import { Urls } from './utils/constants';

const MainPage = lazy(() => import('./pages/main-page'));
const SignInPage = lazy(() => import('./pages/signin-page'));
const OauthPage = lazy(() => import('./pages/oauth-page'));
const TagsPage = lazy(() => import('./pages/tags-page'));
const TagPage = lazy(() => import('./pages/tag-page'));
const UserPage = lazy(() => import('./pages/user-page'));
const UsersPage = lazy(() => import('./pages/users-page'));
const CardPage = lazy(() => import('./pages/card-page'));
const CardModalPage = lazy(() => import('./pages/card-modal-page'));
const UserEditModalPage = lazy(() => import('./pages/user-edit-modal-page'));
const NotFoundPage = lazy(() => import('./pages/404'));

export default function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;
  const { providerValue } = useDarkTheme();

  return (
    <ThemeContext.Provider value={providerValue}>
      <ErrorBoundaryWrapper>
        <Suspense>
          <Routes location={background || location}>
            <Route path={Urls.BASE} element={(<MainPage />)} />
            <Route path={Urls.CARDS.CURRENT} element={(<CardPage />)} />
            <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
            <Route path={Urls.OAUTH.INDEX} element={(<OauthPage />)} />
            <Route path={Urls.TAGS.INDEX} element={(<TagsPage />)} />
            <Route path={Urls.TAGS.CURRENT} element={(<TagPage />)} />
            <Route path={Urls.USERS.INDEX} element={(<UsersPage />)} />
            <Route path={Urls.USERS.CURRENT} element={(<UserPage />)} />
            <Route path={Urls[404]} element={(<NotFoundPage />)} />
          </Routes>
        </Suspense>
        {background
        && (
          <Suspense>
            <Routes>
              <Route path={Urls.USERS.CURRENT_EDIT} element={(<UserEditModalPage />)} />
              <Route path={Urls.CARDS.CURRENT} element={(<CardModalPage />)} />
            </Routes>
          </Suspense>
        )}
        <ToastContainer theme={providerValue.isDark} />
      </ErrorBoundaryWrapper>
    </ThemeContext.Provider>
  );
}
