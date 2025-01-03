import ProgressBar from "../ProgressBar";
import { useEffect, useState, useRef } from 'react';
import { coin, highVoltage, robo, logo } from '../images';
import 'animate.css';
import { ApiService } from "../services/ApiService";
import { Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CoinPage = () => {
  const { t, i18n } = useTranslation();

  const apiServiceRef = useRef<ApiService>();
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [levelProgressBarPercentage, setLevelProgressBarPercentage] = useState(0);
  const [currentDateCoins, setCurrentDateCoins] = useState(0);
  const [notSupported, setNotSupported] = useState(false);

  const levelTitles = ["Beginner", "Basic", "Average", "Trained", "Skilled", "Expert", "Master", "Epic", "Legendary", "God"]

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    apiServiceRef.current = new ApiService();

    const asyncFunction = async () => {
      // @ts-ignore
      if (window.Telegram && Telegram.WebApp) {
        if (isNaN(parseInt(localStorage.getItem("username") ?? ""))) {
          localStorage.clear();
        }

        // @ts-ignore
        const user = Telegram.WebApp.initDataUnsafe?.user;
        
        if (user) {
          const token = await apiServiceRef.current!.getTokenByUsername(user.id + "");
          localStorage.setItem("username", user.id + "");
          localStorage.setItem("auth_token", token);
    
          setPoints(await apiServiceRef.current!.coinInfo());
    
          const levelInfo: any = await apiServiceRef.current!.getLevelInfo();
          setLevel(levelInfo?.level);
          setLevelProgressBarPercentage(((await apiServiceRef.current!.coinInfo() + levelInfo?.level) / 60000) * 100);
          await apiServiceRef.current!.coinInfoByCurrentDate().then((data) => setCurrentDateCoins(data));
          return;
        }
      } 
      
      setNotSupported(true);


      // const token = await apiServiceRef.current!.getTokenByUsername("manxorazmiyim");
      // localStorage.setItem("username", "manxorazmiyim");
      // localStorage.setItem("auth_token", token);

      // setPoints(await apiServiceRef.current!.coinInfo());

      // const levelInfo: any = await apiServiceRef.current!.getLevelInfo();
      // setLevel(levelInfo?.level);
      // setLevelProgressBarPercentage(((await apiServiceRef.current!.coinInfo() + levelInfo?.level) / 60000) * 100);
      // await apiServiceRef.current!.coinInfoByCurrentDate().then((data) => setCurrentDateCoins(data));
    };

    asyncFunction();
  }, []);

  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);


  const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentDateCoins >= 30000) {
      return;
    }

    setPoints(points + level);
    setCurrentDateCoins(currentDateCoins + level);

    setClicks([...clicks, { id: Date.now(), x, y }]);
    setLevelProgressBarPercentage(((points + level) / 60000) * 100);
    apiServiceRef.current!.increaseCoin();
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

        let userLang = localStorage.getItem("user_lang");
        if (!userLang) {
          setIsLangModalVisible(true);
          return;
        }

        i18n.changeLanguage(userLang);
      }, 1000);
    }
  }, [countdown]);

  return (
    <div>
      <video className="fixed top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src="./background-video.mp4" type="video/mp4" />
      </video>

      <Modal 
        component={"div"} open={notSupported}
        sx={{ width: "100%", height: "100%", zIndex: 99999 }}>
          <div className="w-full h-full">
            <h1>Use mobile phone</h1>
          </div>
      </Modal>

      <Modal 
        component={"div"} 
        open={isLangModalVisible} 
        sx={{ width: "100%", height: "100%", zIndex: 99999 }}>
        <div className="w-full h-full lang-modal">
          <h1 className="lang-title">Please select your language</h1>

          <div className="lang-btn-wrapper">
            <button className="lang-btn" onClick={() => {
              localStorage.setItem("user_lang", "ENGLISH"); 
              i18n.changeLanguage("ENGLISH");
              apiServiceRef.current!.setUserLang("ENGLISH");
              setIsLangModalVisible(false);
            }}>
              <span>English</span>
              <img src="./lang-btn-1.png" alt="" />
            </button>

            <button className="lang-btn" onClick={() => {
              localStorage.setItem("user_lang", "RUSSIAN"); 
              i18n.changeLanguage("RUSSIAN");
              apiServiceRef.current!.setUserLang("RUSSIAN");
              setIsLangModalVisible(false);
            }}>
              <span>Russian</span>
              <img src="./lang-btn-2.png" alt="" />
            </button>

            <button className="lang-btn" onClick={() => {
              localStorage.setItem("user_lang", "BRAZILIAN"); 
              i18n.changeLanguage("BRAZILIAN");
              apiServiceRef.current!.setUserLang("BRAZILIAN");
              setIsLangModalVisible(false);
            }}>
              <span>Brazilian</span>
              <img src="./lang-btn-3.png" alt="" />
            </button>

            <button className="lang-btn" onClick={() => {
              localStorage.setItem("user_lang", "UZBEK"); 
              i18n.changeLanguage("UZBEK");
              apiServiceRef.current!.setUserLang("UZBEK");
              setIsLangModalVisible(false);
            }}>
              <span>Uzbek</span>
              <img src="./lang-btn-4.png" alt="" />
            </button>

            <button className="lang-btn" onClick={() => {
              localStorage.setItem("user_lang", "INDIAN");
              i18n.changeLanguage("INDIAN");
              apiServiceRef.current!.setUserLang("INDIAN");
              setIsLangModalVisible(false);
            }}>
              <span>Indian</span>
              <img src="./lang-btn-5.png" alt="" />
            </button>
          </div>
        </div>
      </Modal>

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
          {t("welcome")} {countdown}
        </h1>
      </div>

      <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
        <div className="mt-12 mb-12 text-5xl font-bold flex items-center">
          <img src={coin} width={44} height={44} />
          <span className="ml-2">{points.toLocaleString()}</span>
        </div>

        {level < 10 && <ProgressBar progress={levelProgressBarPercentage} label={levelTitles[level]} />}
      
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
                +{level}
              </div>
            ))}
          </div>

          <div className="mt-12 w-full flex justify-between">
            <div className="flex items-center gap-2">
              <img src={highVoltage} width={40} />
              <span className="text-2xl font-bold">{currentDateCoins.toLocaleString()} / 30,000</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={robo} width={40} />
              <span className="text-2xl font-bold">{t("level")} {level}</span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CoinPage;