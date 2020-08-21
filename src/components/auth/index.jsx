import React, { useState } from 'react';
import './style.scss';
import { useAuth } from 'hooks';

const Auth = ({ setAuth }) => {
  const { request } = useAuth();
  const [error, setError] = useState('');

  return (
    <section className="Auth">
      <h2>Авторизация</h2>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          const key = await request(evt.target.password.value);
          console.log(key);
          setError(!key);
          setAuth(key);
        }}
      >
        <input name="password" type="password" placeholder="Введите пароль" />
      </form>
      {error && <div className="Auth__error">Неверный пароль</div>}
    </section>
  );
};

export default Auth;
