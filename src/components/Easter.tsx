import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixText } from './ui/MatrixText';
import styles from './Easter.module.css';

export const Easter = () => {
  const [showCoordinates, setShowCoordinates] = useState(false);



  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCoordinates(true);
  };

  const closeCoordinates = () => {
    setShowCoordinates(false);
  };



  return (
    <>
      <section className={styles.easter} id="easter">
        <div className={styles.container}>
          <motion.div 
            className={styles.hint}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            onClick={handleTextClick}
          >
            <MatrixText 
              text="Щёлкни в темноте" 
              speed={250}
              className={styles.hintText}
            />
          </motion.div>
        </div>
      </section>

      {/* Coordinates Modal */}
      <AnimatePresence>
        {showCoordinates && (
          <motion.div
            className={styles.coordinatesModal}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={closeCoordinates}
          >
            <div className={styles.coordinatesContent}>
              <p>21.121686269135598, -11.401066852835761</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
};