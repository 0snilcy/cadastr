import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const App = React.lazy(() => import('./App'));
const Auth = React.lazy(() => import('./components/auth'));

const AppContaier = () => {
  const [isAuth, setAuth] = useState(false);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      {isAuth ? <App /> : <Auth setAuth={setAuth} />}
    </Suspense>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Загрузка...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
