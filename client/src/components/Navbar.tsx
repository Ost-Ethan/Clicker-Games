import { Link, Outlet, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { LoginHeaderButton } from './LoginHeaderButton';
import { SignOutHeaderButton } from './SignOutHeaderButton';
import blankUser from '../assets/Portrait_Placeholder.png';
import { useContext } from 'react';
import { AppContext } from './AppContext';

export function Navbar() {
  const location = useLocation();
  const [onLoginPage, setOnLoginPage] = useState(true);

  const { loggedIn, setLoggedIn, setTimesClicked } = useContext(AppContext);
  useEffect(() => {
    if (location.pathname != '/UserLogin' && location.pathname != '/Profile') {
      setOnLoginPage(false);
    } else {
      setOnLoginPage(true);
    }
  }, [location.pathname]);

  function resetStates() {
    setTimesClicked(0);
  }

  // There is scaling issues for mobile navbar when a user is logged in and their name is longer than 10 characters. Need to dynamically adjust username name to ...s after 10 characters.
  return (
    <div>
      <div className="NAVBAR-CONTAINER font-Arimo max-w-screen bg-gradient-to-b from-greenGrad from-20% to-blueGrad to-100% shadow-sm flex h-16 items-center">
        <div className="NAVBAR-ENTRIES-GAMELIST md:mt-2 ml-2 md:mb-2 text-center flex md:text-lg basis-1/2">
          <Link onClick={() => resetStates()} to="/">
            <div className="CLICKER-GAMES-ENTRY flex flex-wrap mr-2 py-1 px-4 md:p-3 md:m-3 shadow-xl bg-yellowHead rounded-xl active:translate-y-0.5 active:translate-x-0.5">
              Clicker Games!
            </div>
          </Link>
          <Link onClick={() => resetStates()} to="/SpeedClicker">
            <div className="SPEED-CLICKER-ENTRY flex flex-wrap mr-2 px-4 py-1 md:p-3 md:m-3 shadow-xl bg-greenHead rounded-xl active:translate-y-0.5 active:translate-x-0.5">
              Speed Clicker
            </div>
          </Link>
          <Link onClick={() => resetStates()} to="/QuickDraw">
            <div className="QUICKDRAW-ENTRY flex flex-wrap px-4 py-1 md:p-3 md:m-3 shadow-xl bg-redHead rounded-xl active:translate-y-0.5 active:translate-x-0.5">
              Quick Draw
            </div>
          </Link>
        </div>
        <div className="NAVBAR-ENTRIES-USER flex basis-1/2 justify-end">
          <Link to="/Profile">
            <div className="USER-ENTRY flex flex-wrap mr-2 p-2 md:mr-8 bg-redHead md:p-2 md:px-4 rounded-2xl shadow-xl  active:translate-y-0.5 active:translate-x-0.5">
              <div className="md:mr-2 max-w-10">
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
