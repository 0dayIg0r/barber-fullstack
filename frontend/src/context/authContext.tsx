import { createContext, ReactNode, useContext, useState } from "react";

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

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps )   {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    console.log(email, password)
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
