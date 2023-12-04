import { createContext } from 'react';

type AppContextValues = {
  loggedIn: boolean | undefined;
  setLoggedIn: (arg0: boolean) => void;
  isStarted: boolean | undefined;
  setIsStarted: (arg0: boolean) => void;
};

export const AppContext = createContext<AppContextValues>({
  loggedIn: undefined,
  setLoggedIn: () => undefined,
  isStarted: undefined,
  setIsStarted: () => undefined,
});
