import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useIsAuth } from 'hooks';
const App = React.lazy(() => import('./App'));
const Auth = React.lazy(() => import('./components/auth'));

const AppContaier = () => {
  const { isAuth, setAuth, chekcAuth } = useIsAuth();

  useEffect(() => {
    chekcAuth();
  });

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      {isAuth ? <App /> : <Auth setAuth={setAuth} />}
    </Suspense>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Загрузка...</div>}>
      <AppContaier />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
