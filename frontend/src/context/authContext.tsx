// src/contexts/AuthContext.tsx

import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/apiClient";
import { navigateTo } from "./navigateTo";
import { signOut } from "./signOut";

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
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}
const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@barber.token": token } = parseCookies();

    if (token) {
      api.get("/me").then((res) => {
        const { id, name, address, email, subscriptions } = res.data;
        setUser({
          id,
          name,
          address,
          email,
          subscriptions,
        });
      })
      .catch(()=>{
        signOut()
      })
    }
  }, []);

  async function signIn({ email, password }: SignInProps) {
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
   throw new Error(e)
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const res = await api.post("/users", {
        name,
        email,
        password,
      });

      navigateTo("/login");
    } catch (e: any) {
  
      throw new Error(e.message);
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@barber.token", {
        path: "/",
      });
      navigateTo("/");
      setUser(null);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, signIn, signUp, logoutUser }}
    >
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
