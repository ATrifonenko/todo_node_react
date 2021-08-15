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
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.auth.checkAuth();
      if (user) {
        setUser(user);
        setIsAuthenticating(false);
        console.log(user);
      }
    };
    fetchUser();
  }, []);

  const signIn = async (email, password) => {
    await api.auth.signIn(email, password).then((user) => setUser(user));
  };
  const signUp = async (email, password, firstName, secondName, patronymic) => {
    await api.auth.signUp(email, password, firstName, secondName, patronymic).then((user) => setUser(user));
  };
  const logout = () => api.auth.logout().then((user) => setUser(user));

  return {
    user,
    isAuthenticating,
    signIn,
    signUp,
    logout,
  };
}
