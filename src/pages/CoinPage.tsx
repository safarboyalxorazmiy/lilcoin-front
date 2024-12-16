import ProgressBar from "../ProgressBar";
import { useEffect, useState } from 'react';
import { coin, highVoltage, robo, logo } from '../images';
import 'animate.css';

const CoinPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [points, setPoints] = useState(29857775);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setWelcomeModalVisible(false);
        setIsAnimating(false);
      }, 1000); // Duration of the animation
    }
  }, [countdown]);

  return (
    <div>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: welcomeModalVisible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute" as const,
          zIndex: 99999,
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "hidden",
          background: "black",
          fontFamily: "Lilita One, sans-serif"
        }}
        className={isAnimating ? "animate__animated animate__fadeOut" : ""}
      >
        <h1
          className="animate__animated animate__zoomInUp"
          style={{ fontSize: "60px", textAlign: "center" }}
        >
          Welcome to LilCoin! {countdown}
        </h1>
      </div>

      <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
        <div className="mt-12 mb-12 text-5xl font-bold flex items-center">
          <img src={coin} width={44} height={44} />
          <span className="ml-2">{points.toLocaleString()}</span>
        </div>

        <ProgressBar progress={80} label="LEGENDARY" />
      </div>
        
      <div className="flex-grow w-full flex items-center justify-center flex-col" style={{height: "110vh", width: "calc(100vw - (40px * 2))", display: "flex", alignItems: "center", justifyContent: "center"}} >
          <div className="coin-container relative mt-4" onClick={handleClick}>
            <img
              src={logo}
              width={256}
              height={256}
              alt="click"
            />
          
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                +1
              </div>
            ))}
          </div>

          <div className="mt-12 w-full flex justify-between">
            <div className="flex items-center gap-2">
              <img src={highVoltage} width={40} />
              <span className="text-2xl font-bold">1 / 10000</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={robo} width={40} />
              <span className="text-2xl font-bold">LEVEL 5</span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CoinPage;