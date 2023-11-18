import { Route, Routes } from 'react-router-dom';
// Import all other page components here.
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="SpeedClicker" />
      <Route path="Results" />
      <Route path="Home" />
      <Route path="Profile" />
      <Route path="UserLogin" />
    </Routes>
  );
}
