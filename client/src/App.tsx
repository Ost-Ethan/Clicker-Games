import { Route, Routes } from 'react-router-dom';
// Import all other page components here.
import { Navbar } from './components/Navbar';
import { SpeedClicker } from './pages/SpeedClicker';
import { HomePage } from './pages/HomePage';
import { UserLogin } from './pages/UserLogin';
import { useEffect, useState } from 'react';
import { Profile } from './pages/Profile';
import { QuickDraw } from './pages/QuickDraw';
import { AppContext } from './components/AppContext';

export default function App() {
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  const [timesClicked, setTimesClicked] = useState(0);
  const [millisecondsInterval, setMillisecondsInterval] = useState<any>();
  const [passedMilliseconds, setPassedMilliseconds] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const contextValues = {
    loggedIn,
    setLoggedIn,
    millisecondsInterval,
    setMillisecondsInterval,
    passedMilliseconds,
    setPassedMilliseconds,
    timesClicked,
    setTimesClicked,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="SpeedClicker" element={<SpeedClicker />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="UserLogin" element={<UserLogin />} />
          <Route path="QuickDraw" element={<QuickDraw />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
