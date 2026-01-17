import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, logout as authLogout, login as authLogin, signup as authSignup, UserRole } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; message: string; user?: User };
  signup: (fullName: string, email: string, password: string, role: UserRole) => { success: boolean; message: string; user?: User };
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    refreshUser();
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const result = authLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const signup = (fullName: string, email: string, password: string, role: UserRole) => {
    const result = authSignup(fullName, email, password, role);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
