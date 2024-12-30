import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

const InvitePage: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t("inviteFriendsTitle")}</h1>
      <p style={styles.subtitle}>{t("inviteFriendsTitle2")}</p>

      <div style={styles.card}>
        <img src="./gift-icon-1.svg" alt="Gift" style={styles.icon} />
        <span style={styles.cardText}>{t("inviteAFriend")}</span>
      </div>

      <div style={styles.footer}>
        <button style={styles.button} onClick={() => enqueueSnackbar('Successfully Copied!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1000 })}>
          <span>{t("inviteAFriend")}</span>         
          <img src="./invite-icon.svg" alt="" />
        </button>

        <button style={styles.button2} onClick={() => {
          navigator.clipboard.writeText('https://www.google.com').then(() => {
            enqueueSnackbar('Successfully Copied!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1000 })
          }).catch(() => {
            enqueueSnackbar('Failed to copy text.', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1000 })
          })}}>
          <img src="./copy-icon.svg" alt="" />
        </button>
      </div>



    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    padding: '20px',
    borderRadius: '10px',
    fontFamily: "Lilita One, sans-serif",
    height: "80vh",
    textAlign: "center" as const,
  },
  title: {
    fontSize: '50px',
  },
  subtitle: {
    fontSize: '23px',
    color: '#FFF',
    width: "100%"
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ABA5A5',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '10px',
    width: "100%",
    height: "114px"
  },
  icon: {
    width: '100px',
    height: '100px',
    marginRight: '10px',
  },
  cardText: {
    fontSize: '23px',
    fontFamily: "Lilita One, sans-serif"
  },
  listHeader: {
    fontSize: '16px',
    margin: '20px 0 10px',
    fontWeight: 'bold',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: "350px",
    bottom: 0
  },
  button: {
    backgroundColor: '#4169E1',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: "10px",
    width: "70%"
  },
  button2: {
    backgroundColor: '#4169E1',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: "10px",
    width: "20%"
  }
};

export default InvitePage;
