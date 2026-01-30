/**
 * AuthContext
 * Provides authentication state and methods for the application
 */

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Check localStorage synchronously to prevent blinking
  const getInitialAuthState = () => {
    try {
      return localStorage.getItem('giopio_auth') === 'true';
    } catch {
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState);

  const login = (password) => {
    const correctPassword = import.meta.env.VITE_APP_PASSWORD || 'Giopio@20226';

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('giopio_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('giopio_auth');
  };

  const value = {
    isAuthenticated,
    isLoading: false,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
