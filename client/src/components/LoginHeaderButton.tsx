import { Link } from 'react-router-dom';

export function LoginHeaderButton() {
  return (
    <>
      <div className="LOG-IN-BUTTON font-Arimo basis-full flex justify-end mt-2 mx-2 my-0.5">
        <Link to={`UserLogin`}>
          <button className="p-4 px-20 bg-yellowLogin rounded-full  active:translate-y-0.5 active:translate-x-0.5">
            Sign In
          </button>
        </Link>
      </div>
      <div className="font-Arimo basis-full flex justify-end mx-4 my-0.5 select-none">
        <p>Log in to save your scores!</p>
      </div>
    </>
  );
}
