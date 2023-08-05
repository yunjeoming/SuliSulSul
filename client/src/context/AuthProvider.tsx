import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  doLogIn: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('sulsul-admin') === 'true' ? true : false);

  const doLogIn = useCallback(() => {
    setIsLoggedIn(true);
    sessionStorage.setItem('sulsul-admin', 'true');
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      doLogIn,
    }),
    [isLoggedIn, doLogIn],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
