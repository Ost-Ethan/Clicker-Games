import { createContext } from 'react';

type AppContextValues = {
  loggedIn: boolean | undefined;
  timesClicked: number;
  passedMilliseconds: number;
  millisecondsInterval: any | undefined;
  setMillisecondsInterval: (arg0) => void;
  setTimesClicked: (arg0: number) => void;
  setPassedMilliseconds: (arg0: unknown) => void;
  setLoggedIn: (arg0: boolean) => void;
};

export const AppContext = createContext<AppContextValues>({
  loggedIn: undefined,
  timesClicked: 0,
  passedMilliseconds: 0,
  millisecondsInterval: undefined,
  setMillisecondsInterval: () => undefined,
  setPassedMilliseconds: () => undefined,
  setTimesClicked: () => undefined,
  setLoggedIn: () => undefined,
});
