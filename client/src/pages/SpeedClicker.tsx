import { useState } from 'react';

export function SpeedClicker() {
  const [isStarted, setIsStarted] = useState(false);

  if (isStarted === false) {
    return (
      <div className="flex flex-col justfiy-center items-center flex-wrap">
        <h1 className="m-6">Speed Clicker!</h1>
        <p className="m-0.25">Instructions:</p>
        <p>Click the button 10 times as fast as you can!</p>
        <button
          onClick={() => setIsStarted(true)}
          className="m-3 mt-6 px-16 py-4 bg-greenSclick rounded-2xl">
          Start!
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justfiy-center items-center flex-wrap min-h-full">
        <h1 className="m-6">Speed Clicker!</h1>
        <button className="mt-20 w-60 h-60 bg-greenHead rounded-full self-center"></button>
      </div>
    );
  }
}
