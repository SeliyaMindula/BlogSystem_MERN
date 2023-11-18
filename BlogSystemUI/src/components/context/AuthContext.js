import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  authData: null,
  setAuthData: () => {}
});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

 
  const contextValue = {
    authData,
    setAuthData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
