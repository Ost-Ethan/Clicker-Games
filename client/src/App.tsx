import { Route, Routes } from 'react-router-dom';
// Import all other page components here.
import { Navbar } from './components/Navbar';
import { SpeedClicker } from './pages/SpeedClicker';
import { HomePage } from './pages/HomePage';
import { UserLogin } from './pages/UserLogin';
import { useState } from 'react';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
        <Route path="SpeedClicker" element={<SpeedClicker />} />
        <Route path="Results" />
        <Route path="Home" element={<HomePage />} />
        <Route path="Profile" />
        <Route
          path="UserLogin"
          element={<UserLogin setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
      </Route>
    </Routes>
  );
}
