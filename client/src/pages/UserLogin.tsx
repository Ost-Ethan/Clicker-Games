import { LogInForm } from '../components/LogInForm';

export function UserLogin({ setLoggedIn, loggedIn }) {
  if (loggedIn) {
    return (
      <>
        <div> You are already signed in!</div>
        <button>Sign Out</button>
      </>
    );
  }

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
      console.log(res.status);
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
      console.log('Signed in', user, '; receieved token:', token);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex">
      <div className="LOGIN-COLUMN rounded-full pb-20 mt-20 ml-20 bg-blueGrad flex flex-wrap justify-center basis-5/12">
        <div className="LOGIN-TEXT flex justify-center self-start w-full mt-32 mb-20">
          Login!
        </div>
        <LogInForm buttonText={'Log in'} submitFunction={handleLogIn} />
      </div>
      <div className="flex flex-wrap content-center justify-center basis-2/12">
        Or
      </div>
      <div className="LOGIN-COLUMN rounded-full pb-20 mt-20 mr-20 bg-greenGrad flex flex-wrap justify-center basis-5/12">
        <div className="LOGIN-TEXT flex justify-center self-start w-full mt-32 mb-20">
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
