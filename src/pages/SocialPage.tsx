import { useTranslation } from 'react-i18next';

const SocialPage = () => {
  const { t } = useTranslation();

  return (
    <div className="social-page">
      <img src={"./logo.svg"} alt="Lil-Coin Logo" className="logo" />

      <h1 className="title">{t("followUs")}</h1>
      <p className="subtitle">{t("followUs2")}</p>

      <div className="social-links">
        <SocialLinkLeft
          platform="YouTube"
          handle="@Lilcoin_offical"
          icon={"./youtube-icon.svg"}
          bgColor="#FF0000"
        />
        <SocialLinkRight
          platform="Discord"
          handle="@Lilcoin_offical"
          icon={"./discord-icon.svg"}
          bgColor="#5865F2"
        />
        <SocialLinkLeft
          platform="Instagram"
          handle="@Lilcoin_offical"
          icon={"./instagram-icon.svg"}
          bgColor="#BE1DC3"
        />
        <SocialLinkRight
          platform="X"
          handle="@Lilcoin_offical"
          icon={"./twitter-icon.svg"}
          bgColor="#000"
        />
      </div>

    </div>
  );
};

const SocialLinkLeft = (
  props: {
    platform: string;
    handle: string;
    icon: string;
    bgColor: string;
  }
) => (
  <div className="social-link-left">
    <div className="circle">
      <img src={props.icon} alt={`${props.platform} Icon`} className="social-icon" />
    </div>
    <div className="content" style={{borderRightColor: props.bgColor}}>
      <span className="social-handle">{props.handle}</span>
    </div>
  </div>
);

const SocialLinkRight = (
  props: {
    platform: string;
    handle: string;
    icon: string;
    bgColor: string;
  }
) => (
  <div className="social-link-right">
    <div className="content" style={{borderLeftColor: props.bgColor}}>
      <span className="social-handle">{props.handle}</span>
    </div>
    <div className="circle">
      <img src={props.icon} alt={`${props.platform} Icon`} className="social-icon" />
    </div>
  </div>
);

export default SocialPage;