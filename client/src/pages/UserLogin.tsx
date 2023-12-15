import { useNavigate } from 'react-router-dom';
import { LogInForm } from '../components/LogInForm';
import { useContext } from 'react';
import { AppContext } from '../components/AppContext';

export function UserLogin() {
  const { loggedIn, setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleSignUp(userInfo) {
    try {
      const res = await fetch('/api/users/sign-up', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      alert('You have successfully signed up!');
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogIn(userInfo) {
    try {
      const res = await fetch('/api/users/sign-in', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', user.username);
      setLoggedIn(true);
      navigate('/');
    } catch (err) {
      alert(`User Login was invalid.`);
      console.log(err);
    }
  }

  if (loggedIn) {
    return (
      <>
        <div> You are already signed in!</div>
        <button>Sign Out</button>
      </>
    );
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap columns-1 justify-center">
      <div className="LOGIN-COLUMN rounded-full w-full mt-4 p-6 md:pb-20 md:mt-20 md:ml-20 bg-blueGrad flex flex-wrap justify-center md:basis-5/12">
        <div className="LOGIN-TEXT flex justify-center self-start w-full mt-16 mb-12 md:mt-32 md:mb-20">
          Login!
        </div>
        <LogInForm buttonText={'Log in'} submitFunction={handleLogIn} />
      </div>
      <div className="flex flex-wrap content-center justify-center md:basis-2/12">
        Or
      </div>
      <div className="LOGIN-COLUMN rounded-full w-full p-6 md:pb-20 md:mt-20 md:mr-20 bg-greenGrad flex flex-wrap justify-center md:basis-5/12">
        <div className="LOGIN-TEXT flex justify-center self-start w-full mt-16 mb-12 md:mt-32 md:mb-20">
          Sign Up!
        </div>
        <LogInForm
          buttonText={'Create Profile'}
          submitFunction={handleSignUp}
        />
      </div>
    </div>
  );
}
