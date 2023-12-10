import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/AppContext';
import { Results } from '../components/Results';

export function QuickDraw() {
  const [isStarted, setIsStarted] = useState(false);
  const [startDelayTimerIntervalKey, setStartDelayTimerIntervalKey] =
    useState<any>();
  const [delayTimer, setDelayTimer] = useState(0);
  const [drawState, setDrawState] = useState(false);
  const [delayInt, setDelayInt] = useState<any>();

  const {
    setPassedMilliseconds,
    leftEarly,
    setLeftEarly,
    millisecondsInterval,
    quickDrawFinished,
    setQuickDrawFinished,
  } = useContext(AppContext);
  useEffect(() => {
    setPassedMilliseconds(0);
    setIsStarted(false);
    setLeftEarly(false);
  }, [setLeftEarly, setPassedMilliseconds]);

  //Defining a function that will give me a random number between 2 numbers.
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  if (delayInt) {
    if (delayTimer === delayInt * 100) {
      clearInterval(startDelayTimerIntervalKey);
      setDelayInt(undefined);
      console.log(`This is where ${delayTimer} and ${delayInt * 100} match!`);
      setDrawState(true);
    }
  }

  function handleGameStart() {
    // Get a random number between 2 and 5 for delay timer.
    console.log(delayInt);
    setStartDelayTimerIntervalKey(
      setInterval(() => {
        setDelayTimer((prev) => prev + 1);
      })
    );
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

  if (quickDrawFinished) {
    clearInterval(millisecondsInterval);
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
      <div className="conatiner flex justify-between">
        <div className="flex flex-col flex-wrap justify-center">
          <p className="self-center">Start</p>
          <button
            onMouseOver={() => handleGameStart()}
            onMouseOut={() => {
              clearInterval(startDelayTimerIntervalKey),
                setStartDelayTimerIntervalKey(0),
                setDelayTimer(0);
              if (!drawState) {
                setLeftEarly(true);
              }
            }}
            className="bg-redHead self-center p-24 rounded-full"></button>
        </div>
        <div className="flex">
          {drawState && (
            <button
              onMouseOver={() => {
                console.log('hovered finished button');
                clearInterval(millisecondsInterval);
                setQuickDrawFinished(true);
              }}
              className="bg-redHead self-end mr-14 p-24 rounded-full"></button>
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
