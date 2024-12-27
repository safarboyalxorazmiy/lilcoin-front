import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { ApiService } from '../services/ApiService';

const BoostPage = () => {
  const { t } = useTranslation();
  const apiServiceRef = useRef<ApiService>(new ApiService());
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const asyncFunction = async () => {
      let levelInfo: any = await apiServiceRef.current?.getLevelInfo();
      setLevel(levelInfo.level);
    };
    asyncFunction();
  
  }, []);
  
  return (
    <div className="boost-page mt-4">
      <button 
        className="boost-content-1 p-8"
        onClick={async () => {
          await apiServiceRef.current?.boostLevel();
        }}>
        <h1>{t("boostYour")}</h1>
        <img src="lilcoin.svg" alt="LILCOIN" />
      </button>

      <button 
        className="boost-content-2 p-8" 
        onClick={async () => {
          await apiServiceRef.current?.boostLevel();
        }}>
        <h1>{t("currentPrice")}:</h1>

        <div className="flex gap-4">
          <img src="logo.svg" alt="LILCOIN" className="coin" />
          <h1>60,000</h1>
        </div>
      </button>

      <button 
        className="boost-content-3 p-8" 
        onClick={async () => {
          await apiServiceRef.current?.boostLevel();
        }}>
        <h2>{t("tapTitle")} {level}</h2>
      </button>
    </div>
  );
}

export default BoostPage;