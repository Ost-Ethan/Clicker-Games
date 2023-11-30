import { Link } from 'react-router-dom';

export function LoginHeaderButton() {
  return (
    <>
      <div className="LOG-IN-BUTTON font-Arimo basis-full flex justify-end mt-2 mx-2 my-0.5">
        <Link to={`UserLogin`}>
          <button className="px-10 py-3 md:p-4 md:px-20 bg-yellowLogin rounded-full  active:translate-y-0.5 active:translate-x-0.5">
            Sign In
          </button>
        </Link>
      </div>
      <div className="text-sm font-Arimo min-w-max ml-40 basis-full flex flex-wrap justify-end mx-4 my-0.5 select-none">
        <p>Log in to save your scores!</p>
      </div>
    </>
  );
}
