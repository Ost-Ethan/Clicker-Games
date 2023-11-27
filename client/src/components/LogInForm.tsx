import { FormEvent, useState } from 'react';

export function LogInForm({ buttonText, submitFunction }) {
  const [username, setUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const userInfo = {
      username,
      inputPassword,
    };
    console.log(userInfo);
    setUsername('');
    setInputPassword('');
    submitFunction(userInfo);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="USERNAME-FORM flex flex-wrap flex-col"
      id="LogInForm">
      <label className="text-left" htmlFor="username">
        UserName
      </label>
      <input
        required
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-42 border-solid border-4 border-grayLogin rounded-2xl p-2"
      />
      <label className="mt-4" htmlFor="password">
        Password
      </label>
      <input
        required
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        id="password"
        type="text"
        className="w-42 border-solid border-4 border-grayLogin rounded-2xl p-2"
      />
      <button
        className="mt-12 self-center py-2 px-6 w-30 bg-yellowLogin rounded-2xl"
        type="submit">
        {buttonText}
      </button>
    </form>
  );
}
