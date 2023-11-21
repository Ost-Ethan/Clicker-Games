import { Link } from 'react-router-dom';
import { ScoreBoard } from './ScoreBoard';

export function Results({
  time,
  setTimesClicked,
  setIsStarted,
  setPassedMilliseconds,
}) {
  return (
    <div className="flex justify-center flex-wrap items-center h-screen">
      <div className="basis-1/2 justify-center flex flex-wrap text-center">
        <div className="basis-full mb-20">
          Your time was {time / 100} seconds.
        </div>
        <div className="basis-1/2">
          <button
            onClick={() => {
              setTimesClicked(0);
              setIsStarted(false);
              setPassedMilliseconds(0);
            }}
            className="p-2 m-2 bg-greenHead">
            Play Again!
          </button>
        </div>
        <div className="basis-1/2">
          <button className="p-2 m-2 bg-yellowHead">
            <Link to="/home">Home Page</Link>
          </button>
        </div>
      </div>
      <div className="basis-1/2 justify-center flex">
        <ScoreBoard game="SpeedClicker" />
      </div>
    </div>
  );
}
