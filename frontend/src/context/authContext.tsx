// src/contexts/AuthContext.tsx

import { setCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/apiClient";
import { navigateTo } from "./navigateTo";

interface SubscriptionsProps {
  id: string;
  status: string;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
  subscriptions?: SubscriptionsProps | null;
}

interface AuthContextData {
  user: UserProps | null;
  isAuthenticated: boolean;
  setUser: (user: UserProps | null) => void;
  signIn: (credentials: SignInProps) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    console.log(email, password);
    try {
      const res = await api.post("/session", {
        email,
        password,
      });
      const { id, name, token, subscriptions, address } = res.data;

      setCookie(undefined, "@barber.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
        address,
        subscriptions,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigateTo("/dashboard");
    } catch (e: any) {
      console.log(e.message);
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado com o AuthProvider");
  }
  return context;
}
