import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { ApiService } from '../services/ApiService';
import { useSnackbar } from 'notistack';

const BoostPage = () => {
  const { t } = useTranslation();
  const apiServiceRef = useRef<ApiService>(new ApiService());
  const [level, setLevel] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();

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
      let levelInfo: any = await apiServiceRef.current?.getLevelInfo();
      setLevel(levelInfo.level);

      enqueueSnackbar(t("boostSuccessModalTitle2"), { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1000 })
    } else {      
      enqueueSnackbar(t("boostErrorModalTitle2"), { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1000 })
    }
  };

  return (
    <div className="boost-page mt-4">
      {level < 10 ? (
        <>
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
        </>
      ) : (
        <>
          <h1>{t("boostCompleatedTitle")}</h1>
        </>
      )}
    </div>
  );
}

export default BoostPage;