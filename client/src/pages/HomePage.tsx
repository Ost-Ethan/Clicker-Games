import speedClicker from '../assets/speedClickerButton.png';
import quickDraw from '../assets/QuickDrawHomeButton.png';
import game3 from '../assets/Game3HomeButton.png';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <div className="font-Arimo flex justify-center text-4xl">
        Clicker Games!
      </div>
      <div className="w-screen flex-wrap flex mt-16 justify-around">
        <div className="flex flex-wrap m-4">
          <Link to={'/speedClicker'}>
            <img src={speedClicker} alt="SpeedClicker Game Button"></img>
          </Link>
        </div>
        <div className="flex flex-wrap m-4">
          <img src={quickDraw}></img>
        </div>
      </div>
      <div className="w-screen flex justify-center mt-4">
        <img src={game3}></img>
      </div>
    </>
  );
}
