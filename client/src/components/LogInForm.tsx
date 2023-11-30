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
    setUsername('');
    setInputPassword('');
    submitFunction(userInfo);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="USERNAME-FORM flex flex-wrap flex-col items-center">
      <label className="">
        UserName
        <input
          required
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-42 border-solid border-4 border-grayLogin rounded-2xl p-2"
        />
      </label>
      <label className="mt-4">
        Password
        <input
          required
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          type="password"
          className="w-42 border-solid border-4 border-grayLogin rounded-2xl p-2"
        />
      </label>
      <button
        className="mt-12 self-center py-2 px-6 w-30 bg-yellowLogin rounded-2xl active:translate-y-0.5 active:translate-x-0.5"
        type="submit">
        {buttonText}
      </button>
    </form>
  );
}
