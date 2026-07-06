import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import {
  login as loginService,
  logout as logoutService,
  subscribeToAuthChanges,
} from "../services/auth.service";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email: string, password: string, rememberMe = false) {
    const loggedUser = await loginService(email, password, rememberMe);
    setUser(loggedUser);
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
