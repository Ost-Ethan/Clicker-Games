import { Route, Routes } from 'react-router-dom';
// Import all other page components here.
import { Navbar } from './components/Navbar';
import { SpeedClicker } from './pages/SpeedClicker';
import { HomePage } from './pages/HomePage';
import { UserLogin } from './pages/UserLogin';
import { useEffect, useState } from 'react';
import { Profile } from './pages/Profile';
import { QuickDraw } from './pages/QuickDraw';

export default function App() {
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
        <Route index element={<HomePage />} />
        <Route
          path="SpeedClicker"
          element={<SpeedClicker loggedIn={loggedIn} />}
        />
        <Route path="Profile" element={<Profile loggedIn={loggedIn} />} />
        <Route
          path="UserLogin"
          element={<UserLogin setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
        <Route path="QuickDraw" element={<QuickDraw />} />
      </Route>
    </Routes>
  );
}
