import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../config/roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Admin User',
    role: ROLES.SUPER_ADMIN,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);