import { useContext, useEffect, useState } from 'react';
import { Results } from '../components/Results';
import { AppContext } from '../components/AppContext';

export function SpeedClicker() {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setIsStarted(false);
  }, []);

  const {
    timesClicked,
    setTimesClicked,
    millisecondsInterval,
    setMillisecondsInterval,
    passedMilliseconds,
    setPassedMilliseconds,
  } = useContext(AppContext);

  function timeSet() {
    setPassedMilliseconds((prev) => prev + 1);
  }

  if (timesClicked >= 10) {
    clearInterval(millisecondsInterval);
    return (
      <Results
        gameId={1}
        setIsStarted={setIsStarted}
        gameName={'SpeedClicker'}
      />
    );
  }

  if (isStarted === false) {
    return (
      <div className="font-Arimo flex flex-col justfiy-center items-center flex-wrap">
        <h1 className="m-6 text-3xl">Speed Clicker!</h1>
        <p className="m-0.25 text-2xl">Instructions:</p>
        <p className="text-lg mt-2">
          Click the button 10 times as fast as you can!
        </p>
        <button
          onClick={() => {
            setIsStarted(true);
            setMillisecondsInterval(setInterval(timeSet));
            console.log('do onClick events fire twice in strict mode?');
          }}
          className="text-xl m-3 mt-6 px-16 py-4 bg-greenSclick rounded-2xl shadow-xl active:translate-y-0.5 active:translate-x-0.5">
          Start!
        </button>
      </div>
    );
  } else {
    return (
      <div className="font-Arimo flex flex-col justfiy-center items-center flex-wrap min-h-full select-none">
        <h1 className="mt-12 text-2xl">Speed Clicker!</h1>
        <p className="text-lg mt-4">Times Clicked: {timesClicked} / 10</p>
        <p className="text-xl mt-4">
          Passed Seconds:{' '}
          {passedMilliseconds ? passedMilliseconds / 100 : 'Error'}
        </p>
        <button
          onClick={() => setTimesClicked(timesClicked + 1)}
          className="mt-36 w-60 h-60 bg-greenSclick rounded-full self-center active:bg-greenHead"></button>
      </div>
    );
  }
}
