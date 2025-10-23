import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.container}>
        <div className={styles.contact}>
          <span className={styles.label}>CONTACT</span>
          <a href="mailto:contact@vera.black" className={styles.email}>
            contact@vera.black
          </a>
        </div>

        <div className={styles.coords}>
          <span className={styles.coordText}>∴ 55.7558°N 37.6173°E ∴</span>
        </div>

        <div className={styles.copyright}>
          <span>VERA © 2025 — Структура веры</span>
          <div className={styles.hint}>
            <span>Щёлкни в темноте</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
