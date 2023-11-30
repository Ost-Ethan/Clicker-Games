import speedClicker from '/speedClickerButton.png';
import quickDraw from '/QuickDrawHomeButton.png';
import game3 from '/Game3HomeButton.png';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <div className="font-Arimo mt-6 flex justify-center text-4xl">
        Clicker Games!
      </div>
      <div className="w-screen flex-wrap flex mt-16 justify-around">
        <div className="flex flex-wrap m-4  active:translate-y-0.5 active:translate-x-0.5">
          <Link to={'/speedClicker'}>
            <img src={speedClicker} alt="SpeedClicker Game Button"></img>
          </Link>
        </div>
        <div className="flex flex-wrap m-4  active:translate-y-0.5 active:translate-x-0.5">
          <img src={quickDraw} alt="QuickDraw Game Button"></img>
        </div>
      </div>
      <div className="w-screen flex justify-center mt-4  active:translate-y-0.5 active:translate-x-0.5">
        <img src={game3} alt="game3 button"></img>
      </div>
    </>
  );
}
