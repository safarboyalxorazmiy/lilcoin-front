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
  const [points, setPoints] = useState(1);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    apiServiceRef.current = new ApiService();

    const asyncFunction = async () => {
      // // @ts-ignore
      // if (window.Telegram && Telegram.WebApp) {
      //   // @ts-ignore
      //   const user = Telegram.WebApp.initDataUnsafe?.user;
        
      //   if (user) {
      //     const token = await apiServiceRef.current!.getTokenByUsername(user.username);
      //     localStorage.setItem("username", "manxorazmiyim");
      //     localStorage.setItem("auth_token", token);
      //   }
      // }

      const token = await apiServiceRef.current!.getTokenByUsername("manxorazmiyim");
      localStorage.setItem("username", "manxorazmiyim");
      localStorage.setItem("auth_token", token);

      setPoints(await apiServiceRef.current!.coinInfo());
    };

    asyncFunction();
  }, []);

  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const pointsToAdd = 1;


  const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x, y }]);
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
              <span className="text-2xl font-bold">{t("level")} 5</span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CoinPage;