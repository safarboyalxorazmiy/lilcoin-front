import { useTranslation } from 'react-i18next';

const AdvertizementPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="advertisement-page">
      <h1 className="title">{t("advertisementTitle")}</h1>
      <h1 className="title-2">{t("contactUs")}</h1>
      <a href="https://t.me/@lilcoinquestion_bot">@lilcoinquestion_bot</a>

      <img src="./telegram-icon.svg" alt="" />
    </div>
  );
}

export default AdvertizementPage;