import { useEffect, useState } from 'react';
import { ScoreboardEntries } from './ScoreboardEntries';

export function ScoreBoard({ game, gameId }) {
  const [scoreboardTimes, setScoreboardTimes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTimes() {
      try {
        const res = await fetch(`/api/times/${gameId}`);
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        const parsedInfo = await res.json();
        setScoreboardTimes(parsedInfo);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    getTimes();
  }, [gameId]);

  if (isLoading) {
    return <div>Loading Scoreboard...</div>;
  }

  return (
    <>
      <div className="border-solid border-2 flex flex-col basis-full max-w-sm rounded select-none">
        <div className=" flex flex-wrap text-center border-b-2 bg-blueScoreboard h-12 justify-center content-center">
          Top Times for {game}:
        </div>
        <div className="TABLE flex flex-wrap">
          <div className="border-solid border-r-2 border-b-2 px-2 basis-1/6 flex justify-center">
            Rank
          </div>{' '}
          <div className="px-2 border-solid border-b-2 border-r-2 basis-2/6  flex justify-center">
            User
          </div>{' '}
          <div className="border-solid border-b-2 px-2 basis-3/6  flex justify-center">
            Time
          </div>
          <ScoreboardEntries scoreboardTimes={scoreboardTimes} />
        </div>
      </div>
    </>
  );
}
