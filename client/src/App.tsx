import { Route, Routes } from 'react-router-dom';
// Import all other page components here.
import { Navbar } from './components/Navbar';
import { SpeedClicker } from './pages/SpeedClicker';
import { HomePage } from './pages/HomePage';
import { UserLogin } from './pages/UserLogin';
import { useEffect, useState } from 'react';

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
        <Route path="Results" />
        <Route path="Profile" />
        <Route
          path="UserLogin"
          element={<UserLogin setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
      </Route>
    </Routes>
  );
}
