/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLogin: boolean;
  login: (newToken: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // State for Token and user
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isLogin = !!token;

  // login method
  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("user_info", JSON.stringify(userData));
  };

  // logout method
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("add <AuthProvider> to main.tsx");
  }
  return context;
}
