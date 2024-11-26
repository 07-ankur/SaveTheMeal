import React, { createContext, useState, useEffect } from "react";
import { User } from "../types";
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
} from "../services/api";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to get current user:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login'; // Redirect to login if token is invalid
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);
  

  const login = async (email: string, password: string) => {
    const userData = await loginService(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
