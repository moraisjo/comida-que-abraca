import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

type AuthContextType = {
  userId: string | null;
  userType: string | null;
  token: string | null;
    setAuthData: (data: { userId: string; userType: string; token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // busca dados do usuario no localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedUserType = localStorage.getItem('userType');
    const storedToken = localStorage.getItem('token');
    if (storedUserId && storedUserType && storedToken) {
      setUserId(JSON.parse(storedUserId));
      setUserType(storedUserType);
      setToken(storedToken);
    }
  }, []);

  const setAuthData = ({ userId, userType, token }: { userId: string; userType: string; token: string }) => {
    setUserId(userId);
    setUserType(userType);
    setToken(token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUserId(null);
    setUserType(null);
    setToken(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
  };

  const value = useMemo(
    () => ({ userId, userType, token, setAuthData, logout }),
    [userId, userType, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};