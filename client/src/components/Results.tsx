import { Link } from 'react-router-dom';
import { ScoreBoard } from './ScoreBoard';

export function Results({
  time,
  setTimesClicked,
  setIsStarted,
  setPassedMilliseconds,
}) {
  return (
    <div className="flex columns-2 justify-center flex-wrap items-center h-screen">
      <div className="justify-center flex flex-wrap text-center">
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
            className="py-6 px-4 m-2 bg-greenHead rounded-lg">
            Play Again!
          </button>
          <button className="py-6 px-4 m-2 bg-yellowHead rounded-lg">
            <Link to="/home">Home Page</Link>
          </button>
        </div>
        <div className="text-center mt-20 max-w-xs">
          Log in to see your best score and compete on the leaderboard!
        </div>
      </div>
      <div className=" justify-center flex">
        <ScoreBoard gameId="1" game="Speed Clicker" />
      </div>
    </div>
  );
}
