import { Link } from 'react-router-dom';
import { UserTimesTable } from '../components/UserTimesTable';
import blankUser from '../assets/Portrait_Placeholder.png';

export function Profile({ loggedIn }) {
  if (!loggedIn) {
    return (
      <>
        <div>You are not logged in!</div>
        <button>
          <Link to="/UserLogin">Log in!</Link>
        </button>
      </>
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
