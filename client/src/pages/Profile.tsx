import { Link } from 'react-router-dom';
import { UserTimesTable } from '../components/UserTimesTable';
import blankUser from '../assets/Portrait_Placeholder.png';
import { AppContext } from '../components/AppContext';
import { useContext } from 'react';

export function Profile() {
  const { loggedIn } = useContext(AppContext);

  if (!loggedIn) {
    return (
      <div className="font-Arimo w-screen flex flex-col items-center">
        <div className="text-xl mt-16">You are not logged in!</div>
        <Link to="/UserLogin">
          <button className="mt-32 py-12 px-28 bg-yellowLogin rounded-full bg-greenHead active:translate-y-0.5 active:translate-x-0.5">
            Log in!
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="font-Arimo flex flex-col flex-wrap content-center text-center">
        <div className="h-32 text-3xl">Your Profile</div>
        <div className="flex justify-center">
          <img className="h-32 rounded-3xl" src={blankUser}></img>
        </div>
        <div className="my-4 text-4xl">
          {sessionStorage.getItem('username')}
        </div>
        <div className="mt-6">
          <UserTimesTable />
        </div>
      </div>
    </>
  );
}
