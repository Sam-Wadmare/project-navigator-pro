import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as authLogout, login as authLogin, signup as authSignup } from '@/lib/auth';

// create context for auth
const AuthContext = createContext(undefined);

// auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // refresh user from localStorage
  function refreshUser() {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }

  // load user on mount
  useEffect(function() {
    refreshUser();
    setIsLoading(false);
  }, []);

  // login function
  function login(email, password) {
    const result = authLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }

  // signup function
  function signup(fullName, email, password, role) {
    const result = authSignup(fullName, email, password, role);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }

  // logout function
  function logout() {
    authLogout();
    setUser(null);
  }

  const value = {
    user: user,
    isAuthenticated: user !== null,
    isLoading: isLoading,
    login: login,
    signup: signup,
    logout: logout,
    refreshUser: refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
