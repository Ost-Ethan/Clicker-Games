import { Link } from 'react-router-dom';

export function LoginHeaderButton({ setOnLoginPage }) {
  return (
    <>
      <div className="LOG-IN-BUTTON basis-full flex justify-end mx-2 my-0.5">
        <Link to={`UserLogin`}>
          <button
            className="p-4 px-20 bg-yellowLogin rounded-full"
            onClick={() => setOnLoginPage(true)}>
            Sign In
          </button>
        </Link>
      </div>
      <div className="basis-full flex justify-end mx-4 my-0.5">
        <p>Log in to save your scores!</p>
      </div>
    </>
  );
}
