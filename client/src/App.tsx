import { Route, Routes } from 'react-router-dom';
// Import all other page components here.
import { Navbar } from './components/Navbar';
import { SpeedClicker } from './pages/SpeedClicker';
import { HomePage } from './pages/HomePage';
import { UserLogin } from './pages/UserLogin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="SpeedClicker" element={<SpeedClicker />} />
        <Route path="Results" />
        <Route path="Home" element={<HomePage />} />
        <Route path="Profile" />
        <Route path="UserLogin" element={<UserLogin />} />
      </Route>
    </Routes>
  );
}
