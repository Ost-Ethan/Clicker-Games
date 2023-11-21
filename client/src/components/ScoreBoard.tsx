export function ScoreBoard({ game }) {
  // async function getTimes(){
  //   try {
  //     const res = await fetch('/api/times/1');
  //     if (!res.ok) {
  //       throw new Error(res.status);
  //     }
  //     const parsedInfo = await res.json()
  //     parsedInfo.map((element, index) =>{
  //       return(
  //         <div>
  //         </div>
  //       )
  //     } )

  //     return parsedInfo;
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <>
      <div className="border-solid border-2 flex flex-col basis-full max-w-sm rounded">
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
          <div className="ENTRY max-w-full bg-orangeScoreboard flex justify-between basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/6">1</div>
            <div className="basis-2/6 flex flex-wrap break-all justify-center align-middle text-center content-center">
              Billy123
            </div>
            <div className="basis-3/6 flex justify-center content-center">
              6.23 Seconds
            </div>
          </div>
          <div className="ENTRY max-w-full bg-orangeScoreboard flex justify-between basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/6">1</div>
            <div className="basis-2/6 flex flex-wrap break-all justify-center align-middle text-center content-center">
              Billy123
            </div>
            <div className="basis-3/6 flex justify-center content-center">
              6.23 Seconds
            </div>
          </div>
          <div className="ENTRY max-w-full bg-orangeScoreboard flex justify-between basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/6">1</div>
            <div className="basis-2/6 flex flex-wrap break-all justify-center align-middle text-center content-center">
              Billy123
            </div>
            <div className="basis-3/6 flex justify-center content-center">
              6.23 Seconds
            </div>
          </div>
          <div className="ENTRY max-w-full bg-orangeScoreboard flex justify-between basis-full m-2 my-0.5 p-2 px-4 rounded-full">
            <div className="basis-1/6">1</div>
            <div className="basis-2/6 flex flex-wrap break-all justify-center align-middle text-center content-center">
              Billy123
            </div>
            <div className="basis-3/6 flex justify-center content-center">
              6.23 Seconds
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
