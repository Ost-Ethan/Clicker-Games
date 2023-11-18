import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div>
      <nav className="">
        <div className="">
          <ul className="">
            <li className="">
              <Link to="/about" className="title">
                About
              </Link>
            </li>
            <li className="">
              <Link to="/" className="title">
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
