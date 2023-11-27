type SignOutHeaderButtonProps = {
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
};

export function SignOutHeaderButton({ setLoggedIn }: SignOutHeaderButtonProps) {
  return (
    <div className="LOG-IN-BUTTON basis-full flex justify-end mx-2 my-0.5">
      <button
        className="p-4 px-20 bg-yellowLogin rounded-full"
        onClick={() => {
          setLoggedIn(false);
          sessionStorage.removeItem('token');
          console.log('firing handleSignOut');
        }}>
        Sign Out
      </button>
    </div>
  );
}
