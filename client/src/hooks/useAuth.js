import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const authContext = createContext();

export function ProvideAuth({ children }) {
  let auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false); // вернуть true
  useEffect(() => {
    api.auth.checkAuth().then((user) => {
      if (user.logged) {
        setUser(user);
        setIsAuthenticating(false);
      }
    });
  }, []);
  const signIn = (email, password) => {
    // Логин с возвратом user
  };
  const signUp = (email, password) => {
    // Регистрация с возвратом user
  };
  return {
    user,
    isAuthenticating,
    signIn,
    signUp,
  };
}
