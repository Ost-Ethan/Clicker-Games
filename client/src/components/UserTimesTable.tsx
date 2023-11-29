import { useEffect, useState } from 'react';

export function UserTimesTable() {
  const [userTimes, setUserTimes] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  type UserResponse = {
    bestTime: number;
    gameId: number;
    timeId: number;
    userId: number;
  };

  useEffect(() => {
    async function getUserTimes() {
      try {
        const res = await fetch(`/api/user/1`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        const parsedInfo = await res.json();
        setUserTimes(parsedInfo);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    getUserTimes();
  }, []);

  console.log(userTimes);

  if (isLoading) {
    return <div>Loading your times...</div>;
  }

  return (
    <>
      <div className="border-solid border-2 flex flex-col basis-full max-w-sm rounded select-none">
        <div className="flex flex-wrap text-center border-b-2 bg-yellowHead h-12 justify-center content-center">
          Your Top Times:
        </div>
        <div className="TABLE flex flex-wrap">
          <div className="border-solid px-2 basis-1/2 flex justify-center">
            Game
          </div>
          <div className="px-2 border-solid basis-1/2  flex justify-center">
            Your Time
          </div>
          <div className="ENTRY bg-orangeScoreboard flex basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/2 flex break-all justify-center pr-2">
              SpeedClicker
            </div>
            <div className="basis-1/2 flex justify-center pl-4">
              {userTimes[0]
                ? `${userTimes[0].bestTime / 100} Seconds`
                : `-.-- Seconds`}
            </div>
          </div>
          <div className="ENTRY bg-orangeScoreboard flex basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/2 flex break-all justify-center pr-2">
              QuickDraw
            </div>
            <div className="basis-1/2 flex justify-center pl-4">
              {userTimes[1]
                ? `${userTimes[1].bestTime / 100} Seconds`
                : `-.-- Seconds`}
            </div>
          </div>
          <div className="ENTRY bg-orangeScoreboard flex basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/2 flex break-all justify-center pr-2">
              Game #3
            </div>
            <div className="basis-1/2 flex justify-center pl-4">
              {userTimes[2]
                ? `${userTimes[2].bestTime / 100} Seconds`
                : `-.-- Seconds`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
