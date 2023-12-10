import { Link } from 'react-router-dom';
import { ScoreBoard } from './ScoreBoard';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

export function Results({ setIsStarted, gameId, gameName }) {
  const [bestTime, setBestTime] = useState<number>();

  const {
    setTimesClicked,
    passedMilliseconds,
    setPassedMilliseconds,
    setLeftEarly,
  } = useContext(AppContext);

  const { loggedIn } = useContext(AppContext);
  useEffect(() => {
    async function handleScoreUpdate() {
      await fetch('/api/times', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ gameId, bestTime: passedMilliseconds }),
      });
    }

    async function handleScoreSubmit() {
      await fetch('/api/times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ gameId: 1, bestTime: passedMilliseconds }),
      });
    }

    async function handleGetBestScore() {
      if (passedMilliseconds === undefined) return;
      const res = await fetch(`/api/user/${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const response = await res.json();
      if (!response[0]) {
        handleScoreSubmit();
        setBestTime(passedMilliseconds);
      } else if (response[0].bestTime > passedMilliseconds) {
        handleScoreUpdate();
        setBestTime(passedMilliseconds);
      } else if (response[0].bestTime < passedMilliseconds) {
        setBestTime(response[0].bestTime);
      }
    }
    if (loggedIn) {
      handleGetBestScore();
    }
  });

  return (
    <div className="font-Arimo flex columns-2 flex-wrap justify-center items-start h-screen mt-16">
      <div className="justify-center flex flex-wrap text-center select-none">
        <div className="mb-6 text-3xl font-semibold">Result:</div>
        <div className="basis-full mb-20 text-2xl italic">
          {passedMilliseconds
            ? `${passedMilliseconds / 100} seconds!`
            : 'Disqualified...'}
        </div>
        <div className="basis-full">
          <button
            onClick={() => {
              setTimesClicked(0);
              setIsStarted(false);
              setPassedMilliseconds(0);
              setLeftEarly(false);
            }}
            className="text-lg py-6 px-4 m-2 bg-greenHead rounded-lg shadow-xl select-none  active:translate-y-0.5 active:translate-x-0.5">
            Play Again!
          </button>
          <Link to={'/'}>
            <button className="text-lg py-6 px-4 m-2 bg-yellowHead rounded-lg shadow-xl select-none  active:translate-y-0.5 active:translate-x-0.5">
              Home Page
            </button>
          </Link>
        </div>
        {loggedIn ? (
          <>
            <div className="mt-20 max-w-s select-none text-lg">
              Your best time for SpeedClicker is
              {bestTime ? ` ${bestTime / 100} seconds!` : 'Loading...'}
            </div>
          </>
        ) : (
          <div className="text-center mt-20 max-w-xs select-none text-lg">
            Log in to see your best score and compete on the leaderboard!
          </div>
        )}
      </div>
      <div className=" justify-center flex">
        <ScoreBoard gameId={gameId} game={gameName} />
      </div>
    </div>
  );
}
