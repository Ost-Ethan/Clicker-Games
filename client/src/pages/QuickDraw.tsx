import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../components/AppContext';
import { Results } from '../components/Results';

export function QuickDraw() {
  const [isStarted, setIsStarted] = useState(false);
  const [delayTimer, setDelayTimer] = useState(0);
  const [drawState, setDrawState] = useState(false);
  const [delayInt, setDelayInt] = useState<any>();

  const startDelayTimerIntervalKey = useRef<any>(null);
  const millisecondsInterval = useRef<any>(null);

  const startPositionRandomNumber = useRef(0);
  const endPostionRandomNumber = useRef(getRandomInt(1, 3));
  const startStyling = useRef('');
  const endStyling = useRef('');

  const {
    setPassedMilliseconds,
    leftEarly,
    setLeftEarly,
    quickDrawFinished,
    setQuickDrawFinished,
    passedMilliseconds,
  } = useContext(AppContext);

  useEffect(() => {
    setPassedMilliseconds(0);
    setIsStarted(false);
    setLeftEarly(false);
    setQuickDrawFinished(false);
    setDrawState(false);

    return () => {
      // This clears the interval for the millisecond timer when the user leaves the page after starting the game.
      clearInterval(millisecondsInterval.current);
    };
  }, [setLeftEarly, setQuickDrawFinished, setPassedMilliseconds]);

  //Defining a function that will give me a random number between 2 numbers.
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function generatePositions() {
    startPositionRandomNumber.current = getRandomInt(1, 4);
    switch (startPositionRandomNumber.current) {
      case 1:
        startStyling.current = 'top-24';
        break;
      case 2:
        startStyling.current = 'top-40';
        break;
      case 3:
        startStyling.current = 'top-80';
        break;
      default:
        startStyling.current = 'top-24 def';
    }

    endPostionRandomNumber.current = getRandomInt(1, 4);
    switch (endPostionRandomNumber.current) {
      case 1:
        endStyling.current = 'top-24';
        break;
      case 2:
        endStyling.current = 'top-40';
        break;
      case 3:
        endStyling.current = 'top-80';
        break;
      default:
        endStyling.current = 'top-24 def';
    }
    console.log('end styling ', endStyling.current);
    console.log('start styling', startStyling.current);
  }

  function handleGameStart() {
    startDelayTimerIntervalKey.current = setInterval(() => {
      setDelayTimer((prev) => prev + 1);
    });
  }

  if (quickDrawFinished) {
    clearInterval(millisecondsInterval.current);
    return (
      <Results
        setIsStarted={setIsStarted}
        gameId={2}
        gameName={'QuickDraw'}></Results>
    );
  }

  if (delayInt) {
    if (delayTimer === delayInt * 100) {
      clearInterval(startDelayTimerIntervalKey.current);
      setDelayInt(undefined);
      setDrawState(true);
      clearInterval(millisecondsInterval.current);
      millisecondsInterval.current = setInterval(() => {
        setPassedMilliseconds((prev) => prev + 1);
      });
    }
  }

  // If the user exits the start point before the game starts, display the results screen with a DQ message.
  if (leftEarly) {
    return (
      <Results
        setIsStarted={setIsStarted}
        gameId={2}
        gameName={'QuickDraw'}></Results>
    );
  }

  if (isStarted) {
    // GAME LOGIC will go here
    return (
      <div className="conatiner flex justify-evenly content-baseline relative">
        <div
          className={`relative flex flex-col flex-wrap justify-center ${startStyling.current}`}>
          <p className="self-center">Start</p>
          <button
            onMouseOver={() => handleGameStart()}
            onMouseOut={() => {
              clearInterval(startDelayTimerIntervalKey.current),
                setDelayTimer(0);
              if (!drawState) {
                setLeftEarly(true);
              }
            }}
            className="bg-redHead self-center p-24 rounded-full"></button>
        </div>
        <div className="flex flex-wrap text-center justify-center content-center p-4 mr-16">
          <p className="w-40 text-clip basis-full">
            Time:{' '}
            {passedMilliseconds
              ? `${passedMilliseconds / 100} Seconds`
              : `Not Started`}
          </p>
          <p className="flex mt-24 mr-16 text-xl justify-center content-center">
            {drawState ? 'DRAW! ' : 'Ready...'}
          </p>
        </div>
        <div
          className={`relative flex flex-col flex-wrap justify-center mr-14 w-24 ${endStyling.current}`}>
          {drawState && (
            <>
              <p className="self-center mr-14"> Move Here!</p>
              <button
                onMouseOver={() => {
                  setQuickDrawFinished(true);
                }}
                className="bg-redHead self-end p-24 mr-14 rounded-full"></button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    // INSTRUCTIONS PAGE will go here
    <div className="font-Arimo flex flex-col justfiy-center items-center flex-wrap">
      <h1 className="m-6 text-3xl">QuickDraw!</h1>
      <p className="m-0.25 text-2xl">Instructions:</p>
      <p className="text-lg mt-2">1. Place your mouse on the starting spot.</p>
      <p className="text-lg mt-2">2. Wait untill the word "DRAW" appears.</p>
      <p className="text-lg mt-2">
        3. Move your mouse to the goal as fast as you can!
      </p>
      <button
        onClick={() => {
          setIsStarted(true);
          setDelayInt(getRandomInt(3, 8));
          setDrawState(false);
          generatePositions();
        }}
        className="text-xl m-3 mt-6 px-16 py-4 bg-redHead rounded-2xl shadow-xl active:translate-y-0.5 active:translate-x-0.5">
        Start!
      </button>
    </div>
  );
}

// Define an instructions page
// Define a start area that starts the beginning delay timer on mouse hover. Beginning delay timer should have a math.Random value of milliseconds where once it is reached, it triggers the game to start
// Define the logic: if the mouse leaves the start area before the timer starts, end the game and display the time as D/Q
// Define the end position div and place it on the right side of the screen. BG Red and circle.
// Once timer starts, Display the end goal, some text indicating that the game has started, and the timer.
// Once the User Hovers the end point, stop the timer and show the results screen with the game ID. Reminder that millisecondsPassed is part of the useContext.
