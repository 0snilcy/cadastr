import { useState } from 'react';
import axios from 'axios';

const AUTH_KEY = 'AUTH_KEY';

const api = axios.create({
  baseURL: '/',
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(AUTH_KEY)}`,
  },
});

export const useIsAuth = () => {
  const [isAuth, setAuthValue] = useState(!!localStorage.getItem(AUTH_KEY));

  const setAuth = (key) => {
    if (key) {
      localStorage.setItem(AUTH_KEY, key);
      api.defaults.headers['Authorization'] = `Bearer ${key}`;
    }
    setAuthValue(!!key);
  };

  const chekcAuth = async () => {
    try {
      const { data } = await api.post('/isauth');
      const { auth } = data;

      setAuthValue(auth);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    isAuth,
    setAuth,
    chekcAuth,
  };
};

export const useAuth = () => {
  const request = async (password) => {
    try {
      const { data } = await api.post('/auth', { password });
      const { key } = data;
      if (key) {
        localStorage.setItem(AUTH_KEY, key);
        api.defaults.headers.common['Authorization'] = `Bearer ${key}`;
        return key;
      }
    } catch (err) {
      console.lerror(err);
    }
  };

  return {
    request,
  };
};

const getStatus = (status, text) =>
  `${status < 300 ? '✅' : '❌'}  ${status}  ${text}`;

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const request = async (query) => {
    setStatus(null);
    setIsLoading(true);

    try {
      const { data, status, statusText } = await api.post('/api', {
        query,
        grouped: 0,
      });

      setStatus(getStatus(status, statusText));
      setIsLoading(false);
      return data;
    } catch (err) {
      setStatus(getStatus(err.response.status, err.response.statusText));
      setIsLoading(false);
    }
  };

  return {
    request,
    isLoading,
    setIsLoading,
    status,
  };
};

export const useData = () => {
  const [data, setData] = useState(null);
  return {
    data,
    setData,
  };
};
