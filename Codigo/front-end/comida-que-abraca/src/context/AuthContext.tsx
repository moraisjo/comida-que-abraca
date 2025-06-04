import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { jwtDecode } from 'jwt-decode';

type DecodedUser = {
  sub?: string; // subject (unique identifier) = email
  userId?: string;
};

type AuthContextType = {
  token: string | null;
  decodedUser: DecodedUser | null;
  setAuthData: (data: { token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedUser, setDecodedUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      try {
        setDecodedUser(jwtDecode<DecodedUser>(storedToken));
      } catch {
        setDecodedUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        setDecodedUser(jwtDecode<DecodedUser>(token));
      } catch {
        setDecodedUser(null);
      }
    } else {
      setDecodedUser(null);
    }
  }, [token]);

  const setAuthData = ({ token }: { token: string }) => {
    setToken(token);
    localStorage.setItem('token', token);
    try {
      setDecodedUser(jwtDecode<DecodedUser>(token));
    } catch {
      setDecodedUser(null);
    }
  };

  const logout = () => {
    setToken(null);
    setDecodedUser(null);
    localStorage.removeItem('token');
  };

  const value = useMemo(
    () => ({ token, decodedUser, setAuthData, logout }),
    [token, decodedUser]
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