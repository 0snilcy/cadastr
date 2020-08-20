import React from 'react';
import './style.scss';

const Auth = () => {
  return (
    <section className="Auth">
      <h2>Авторизация</h2>
      <form>
        <input type="password" placeholder="Введите пароль" />
      </form>
    </section>
  );
};

export default Auth;
