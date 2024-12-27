import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { ApiService } from '../services/ApiService';

const BoostPage = () => {
  const { t } = useTranslation();
  const apiServiceRef = useRef<ApiService>(new ApiService());
  const [level, setLevel] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState<any>(null);

  useEffect(() => {
    const asyncFunction = async () => {
      let levelInfo: any = await apiServiceRef.current?.getLevelInfo();
      setLevel(levelInfo.level);
    };
    asyncFunction();
  }, []);

  const handleBoostLevel = async () => {
    const success = await apiServiceRef.current?.boostLevel();
    if (success) {
      setSuccessModalVisible(true);

      let levelInfo: any = await apiServiceRef.current?.getLevelInfo();
      setLevel(levelInfo.level);

      setTimeout(() => {
        setSuccessModalVisible(null);
      }, 2000);
    } else {
      setSuccessModalVisible(false);
      
      setTimeout(() => {
        setSuccessModalVisible(null);
      }, 2000);
    }
  };

  return (
    <div className="boost-page mt-4">
      <button className="boost-content-1 p-8" onClick={handleBoostLevel}>
        <h1>{t("boostYour")}</h1>
        <img src="lilcoin.svg" alt="LILCOIN" />
      </button>

      <button className="boost-content-2 p-8" onClick={handleBoostLevel}>
        <h1>{t("currentPrice")}:</h1>

        <div className="flex gap-4">
          <img src="logo.svg" alt="LILCOIN" className="coin" />
          <h1>60,000</h1>
        </div>
      </button>

      <button className="boost-content-3 p-8" onClick={handleBoostLevel}>
        <h2>{t("tapTitle")} {level}</h2>
      </button>

      {successModalVisible == true && (
        <div className="game-modal success-modal">
          <div className="modal-content">
            <h1>🏆 { t("boostSuccessModalTitle") } !</h1>
            <p>{ t("boostSuccessModalTitle2") } {level}!</p>
          </div>
        </div>
      )}

      {successModalVisible == false && (
        <div className="game-modal error-modal">
          <div className="modal-content">
            <h1>💥 { t("boostErrorModalTitle") }!</h1>
            <p> { t("boostErrorModalTitle2") } </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default BoostPage;