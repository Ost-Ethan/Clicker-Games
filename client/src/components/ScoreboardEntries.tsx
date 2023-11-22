export function ScoreboardEntries({ scoreboardTimes }) {
  let rank = 1;

  const timesJsx = scoreboardTimes.map((element) => (
    <div
      key={element.timeId}
      className="ENTRY max-w-full bg-orangeScoreboard flex justify-between basis-full m-2 my-0.5 p-2 px-4 rounded-full">
      <div className="basis-1/6">{rank++}</div>
      <div className="basis-2/6 flex flex-wrap break-all justify-center align-middle text-center content-center">
        {element.username}
      </div>
      <div className="basis-3/6 flex justify-center content-center">
        {element.bestTime / 1000} Seconds
      </div>
    </div>
  ));

  return <>{timesJsx}</>;
}
