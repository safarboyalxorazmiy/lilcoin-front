import { useTranslation } from 'react-i18next';

const BoostPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="boost-page mt-4">
      <div className="boost-content-1 p-8">
        <h1>{t("boostYour")}</h1>
        <img src="lilcoin.svg" alt="LILCOIN" />
      </div>

      <div className="boost-content-2 p-8">
        <h1>{t("currentPrice")}:</h1>

        <div className="flex gap-4">
          <img src="logo.svg" alt="LILCOIN" className="coin" />
          <h1>1000</h1>
        </div>
      </div>

      <div className="boost-content-3 p-8">
        <h2>{t("tapTitle")} 2</h2>
      </div>
    </div>
  );
}

export default BoostPage;