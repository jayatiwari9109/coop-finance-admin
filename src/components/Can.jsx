import React from 'react';
import { useAuth } from '../context/AuthContext';
import { hasPermission } from '../config/roles';

export const Can = ({ module, action, children }) => {
  const { user } = useAuth();

  if (!user || !hasPermission(user.role, module, action)) {
    return null;
  }

  return <>{children}</>;
};

export default Can;