import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const signIn = (username, token) => {
    setToken(token);
    setUsername(username);
  };

  const signOut = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
