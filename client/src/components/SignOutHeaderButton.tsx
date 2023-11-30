type SignOutHeaderButtonProps = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
};

export function SignOutHeaderButton({ setLoggedIn }: SignOutHeaderButtonProps) {
  return (
    <div className="SIGN-OUT-BUTTON font-Arimo basis-full flex justify-end mx-2 my-0.5">
      <button
        className="px-10 py-3 md:p-4 md:px-20 bg-redLogOut/60 rounded-full  active:translate-y-0.5 active:translate-x-0.5"
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
