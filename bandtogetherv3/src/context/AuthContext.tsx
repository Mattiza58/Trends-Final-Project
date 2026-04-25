import { WrappedComponentProps } from 'react-with-firebase-auth';
import { createComponentWithAuth } from '../firebase.ts';
import { FC, useContext, PropsWithChildren } from 'react';
import { createContext } from 'react';
import { User } from '../types.ts';

type AuthData = Omit<WrappedComponentProps, 'user'> & {
  user?: User | null;
};

const AuthUserContext = createContext<AuthData | undefined>(undefined);

const AuthUserProvider: FC<PropsWithChildren<WrappedComponentProps>> = ({ children, ...auth }) => (
  <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
);

export default createComponentWithAuth(AuthUserProvider);

export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error('AuthUserContext has no value');
  return context;
};
