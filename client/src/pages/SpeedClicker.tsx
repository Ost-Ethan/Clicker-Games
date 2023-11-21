import { useState } from 'react';
import { Results } from '../components/Results';

export function SpeedClicker() {
  const [isStarted, setIsStarted] = useState(false);
  const [timesClicked, setTimesClicked] = useState(0);
  const [millisecondsInterval, setMillisecondsInterval] = useState<any>();
  const [passedMilliseconds, setPassedMilliseconds] = useState(0);

  function timeSet() {
    setPassedMilliseconds((prev) => prev + 1);
  }

  if (timesClicked >= 10) {
    clearInterval(millisecondsInterval);
    return (
      <Results
        time={passedMilliseconds}
        setTimesClicked={setTimesClicked}
        setIsStarted={setIsStarted}
        setPassedMilliseconds={setPassedMilliseconds}
      />
    );
  }

  if (isStarted === false) {
    return (
      <div className="flex flex-col justfiy-center items-center flex-wrap">
        <h1 className="m-6">Speed Clicker!</h1>
        <p className="m-0.25">Instructions:</p>
        <p>Click the button 10 times as fast as you can!</p>
        <button
          onClick={() => {
            setIsStarted(true);
            setMillisecondsInterval(setInterval(timeSet));
          }}
          className="m-3 mt-6 px-16 py-4 bg-greenSclick rounded-2xl">
          Start!
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justfiy-center items-center flex-wrap min-h-full">
        <h1 className="mt-12">Speed Clicker!</h1>
        <p>Times Clicked: {timesClicked} / 10</p>
        <p>Passed Seconds: {passedMilliseconds / 100}</p>
        <button
          onClick={() => setTimesClicked((prev) => prev + 1)}
          className="mt-56 w-60 h-60 bg-greenHead rounded-full self-center"></button>
      </div>
    );
  }
}
