type SignOutHeaderButtonProps = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
};

export function SignOutHeaderButton({ setLoggedIn }: SignOutHeaderButtonProps) {
  return (
    <div className="SIGN-OUT-BUTTON font-Arimo basis-full flex justify-end mx-2 my-0.5">
      <button
        className="py-2 px-20 bg-redLogOut/60 rounded-full shadow-md  active:translate-y-0.5 active:translate-x-0.5"
        onClick={() => {
          setLoggedIn(false);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
        }}>
        Sign Out
      </button>
    </div>
  );
}
