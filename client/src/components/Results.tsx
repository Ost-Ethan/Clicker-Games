import { Link } from 'react-router-dom';
import { ScoreBoard } from './ScoreBoard';
import { useEffect } from 'react';

export function Results({
  loggedIn,
  time,
  setTimesClicked,
  setIsStarted,
  setPassedMilliseconds,
}) {
  useEffect(() => {
    async function handleScoreSubmit() {
      const res = await fetch('/api/times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ gameId: 1, bestTime: time }),
      });
      const response = await res.json();
      console.log(response);
    }

    if (loggedIn) {
      handleScoreSubmit();
    }
  }, [loggedIn, time]);

  return (
    <div className="font-Arimo flex columns-2 flex-wrap justify-center items-start h-screen mt-16">
      <div className="justify-center flex flex-wrap text-center select-none">
        <div className="mb-6 text-3xl font-semibold">Result:</div>
        <div className="basis-full mb-20 text-2xl italic">
          {time / 100} seconds!
        </div>
        <div className="basis-full">
          <button
            onClick={() => {
              setTimesClicked(0);
              setIsStarted(false);
              setPassedMilliseconds(0);
            }}
            className="py-6 px-4 m-2 bg-greenHead rounded-lg shadow-xl select-none">
            Play Again!
          </button>
          <button className="py-6 px-4 m-2 bg-yellowHead rounded-lg shadow-xl select-none">
            <Link to="/home">Home Page</Link>
          </button>
        </div>
        {loggedIn || (
          <div className="text-center mt-20 max-w-xs select-none">
            Log in to see your best score and compete on the leaderboard!
          </div>
        )}
      </div>
      <div className=" justify-center flex">
        <ScoreBoard gameId="1" game="Speed Clicker" />
      </div>
    </div>
  );
}
