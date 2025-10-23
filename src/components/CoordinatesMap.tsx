import { motion } from 'framer-motion';
import styles from './CoordinatesMap.module.css';

export const CoordinatesMap = () => {
  return (
    <section className={styles.coordinates} id="coordinates">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.coordDisplay}>
            <span className={styles.coordLabel}>Coordinates:</span>
            <span className={styles.coordValue}>55.7558° N, 37.6176° E</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};