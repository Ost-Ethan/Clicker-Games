import { createContext } from 'react';

type AppContextValues = {
  loggedIn: boolean | undefined;
  setLoggedIn: (arg0: boolean) => void;
};

export const AppContext = createContext<AppContextValues>({
  loggedIn: undefined,
  setLoggedIn: () => undefined,
});
