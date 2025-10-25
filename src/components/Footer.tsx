import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.container}>
        <div className={styles.contact}>
          <span className={styles.label}>CONTACT</span>
          <a href="https://t.me/sirixs" className={styles.email}>
            Telegram
          </a>
        </div>

        <div className={styles.coords}>
          <span className={styles.coordText}>VERb B cebя</span>
        </div>

        <div className={styles.copyright}>
          <span>VERA © 2025</span>
          <div className={styles.hint}>
            <span>Координаты кроются в темноте</span>
            <br></br>
            <br></br>
            <span className={styles.hiddenCoords} title="">
              21.121686269135598, -11.401066852835761
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
