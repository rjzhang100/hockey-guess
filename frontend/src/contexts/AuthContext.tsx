import { createContext, useState, ReactNode, FC, useEffect } from "react";
import { trpc } from "../utils/trpc";

interface AuthContextType {
  user: any;
}

const AuthContext = createContext<AuthContextType>({
  user: {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const { data, isLoading } = trpc.auth.getSignedInUser.useQuery();

  useEffect(() => {
    if (!isLoading) {
      setUser(data);
    }
  }, [isLoading, data]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
