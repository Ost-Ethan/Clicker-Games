type SignOutHeaderButtonProps = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
};

export function SignOutHeaderButton({ setLoggedIn }: SignOutHeaderButtonProps) {
  return (
    <div className="SIGN-OUT-BUTTON font-Arimo basis-full flex justify-end mx-2 my-0.5">
      <button
        className="py-2 px-20 bg-redLogOut/60 rounded-full"
        onClick={() => {
          setLoggedIn(false);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
          console.log('firing handleSignOut');
        }}>
        Sign Out
      </button>
    </div>
  );
}
