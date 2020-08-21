import React from 'react';
import './style.scss';
import { useAuth } from 'hooks';

const Auth = ({ setAuth }) => {
  const { request } = useAuth();

  return (
    <section className="Auth">
      <h2>Авторизация</h2>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          const key = await request(evt.target.password.value);
          setAuth(key);
        }}
      >
        <input name="password" type="password" placeholder="Введите пароль" />
      </form>
    </section>
  );
};

export default Auth;
