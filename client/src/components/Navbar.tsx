import { Link, Outlet, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { LoginHeaderButton } from './LoginHeaderButton';
import { SignOutHeaderButton } from './SignOutHeaderButton';
import blankUser from '../assets/Portrait_Placeholder.png';

type NavbarProps = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
};

export function Navbar({ loggedIn, setLoggedIn }: NavbarProps) {
  const location = useLocation();
  const [onLoginPage, setOnLoginPage] = useState(true);

  useEffect(() => {
    if (location.pathname != '/UserLogin' && location.pathname != '/Profile') {
      setOnLoginPage(false);
    } else {
      setOnLoginPage(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <div className="NAVBAR-CONTAINER font-Arimo bg-gradient-to-b from-greenGrad from-20% to-blueGrad to-100% shadow-sm flex h-16 items-center">
        <div className="NAVBAR-ENTRIES-GAMELIST  flex text-lg basis-1/2">
          <Link to="/">
            <div className="CLICKER-GAMES-ENTRY p-3 m-3 shadow-xl bg-yellowHead rounded-xl active:translate-y-0.5 active:translate-x-0.5">
              ClickerGames!
            </div>
          </Link>
          <Link to="/SpeedClicker">
            <div className="SPEED-CLICKER-ENTRY p-3 m-3 shadow-xl bg-greenHead rounded-xl active:translate-y-0.5 active:translate-x-0.5">
              SpeedClicker
            </div>
          </Link>
          <Link to="/QuickDraw">
            <div className="QUICKDRAW-ENTRY p-3 m-3 shadow-xl bg-redHead rounded-xl active:translate-y-0.5 active:translate-x-0.5">
              QuickDraw
            </div>
          </Link>
        </div>
        <div className="NAVBAR-ENTRIES-USER flex basis-1/2 justify-end">
          <Link to="/Profile">
            <div className="USER-ENTRY flex flex-wrap mr-8 bg-redHead p-2 px-4 rounded-2xl shadow-xl  active:translate-y-0.5 active:translate-x-0.5">
              <div className="mr-2">
                {sessionStorage.getItem('username') || 'Guest User'}
              </div>
              <img className="w-6" src={blankUser}></img>
            </div>
          </Link>
        </div>
      </div>
      {loggedIn || onLoginPage || <LoginHeaderButton />}
      {loggedIn && (
        <SignOutHeaderButton setLoggedIn={setLoggedIn} loggedIn={false} />
      )}
      <Outlet />
    </div>
  );
}
