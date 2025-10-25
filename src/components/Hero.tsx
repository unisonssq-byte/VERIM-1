import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixText } from './ui/MatrixText';

import styles from './Hero.module.css';

// Floating decorative icons
const FloatingIcons = () => (
  <>
    <motion.div 
      className={`${styles.floatingIcon} ${styles.icon1}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ delay: 2 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </motion.div>

    <motion.div 
      className={`${styles.floatingIcon} ${styles.icon2}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ delay: 3 }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    </motion.div>

    <motion.div 
      className={`${styles.floatingIcon} ${styles.icon3}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.12 }}
      transition={{ delay: 4 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    </motion.div>

    <motion.div 
      className={`${styles.floatingIcon} ${styles.icon4}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.08 }}
      transition={{ delay: 5 }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
        <circle cx="12" cy="12" r="2" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
      </svg>
    </motion.div>
  </>
);

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className={styles.hero} id="hero">
        {/* Floating decorative elements */}
        <FloatingIcons />
        
        {/* Background gradient overlay */}
        <div className={styles.backgroundOverlay} />
        
        {/* Radial gradient effect */}
        <div className={styles.radialGradient} />
        
        <div className={styles.container}>
          {/* Logo without background */}
          <motion.div
            className={styles.logoContainer}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1]
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
          >
            <img 
              src="/logo.png" 
              alt="VERA Logo" 
              className={styles.logoImage}
              onError={(e) => {
                console.log('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>

        {/* Main motto with enhanced reveal */}
        <motion.div
          className={styles.motto}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            delay: 0.8, 
            duration: 1.2,
            ease: [0.175, 0.885, 0.32, 1.275]
          }}
        >
          <h1 className={styles.mottoText}>
            <MatrixText
              text="Мы создаём то, во что VERИM."
              speed={250}
              staggerDelay={40}
            />
          </h1>
        </motion.div>

        {/* Scroll down arrow */}
        <motion.div
          className={styles.scrollArrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          onClick={() => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
              const elementPosition = featuresSection.offsetTop;
              const offsetPosition = elementPosition - 150; // Отступ 80px сверху
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
        >
          <motion.svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut'
            }}
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </motion.svg>
        </motion.div>
      </div>
    </section>

    {/* Modal with Manifesto */}
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />
          
          {/* Modal content */}
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
          >
            {/* Close button */}
            <button 
              className={styles.closeButton}
              onClick={closeModal}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            </button>
            
            {/* Manifesto content */}
            <div className={styles.manifestoWrapper}>
              <div className={styles.manifestoContent}>
                <h2 className={styles.manifestoTitle}>
                  <MatrixText text="MANIFESTO" speed={200} staggerDelay={50} />
                </h2>
                <div className={styles.manifestoLines}>
                  <div className={styles.lineContainer}>
                    <span className={styles.lineNumber}>01</span>
                    <p className={styles.line}>
                      <MatrixText text="VERA — музыкальная структура, которая работает с тем, что не видно." speed={250} staggerDelay={15} />
                    </p>
                  </div>
                  <div className={styles.lineContainer}>
                    <span className={styles.lineNumber}>02</span>
                    <p className={styles.line}>
                      <MatrixText text="Мы не продаём музыку. Мы проектируем веру." speed={250} staggerDelay={15} />
                    </p>
                  </div>
                  <div className={styles.lineContainer}>
                    <span className={styles.lineNumber}>03</span>
                    <p className={styles.line}>
                      <MatrixText text="Каждый релиз — гипотеза." speed={250} staggerDelay={15} />
                    </p>
                  </div>
                  <div className={styles.lineContainer}>
                    <span className={styles.lineNumber}>04</span>
                    <p className={styles.line}>
                      <MatrixText text="Мы не просим слушать. Мы предлагаем наблюдать." speed={250} staggerDelay={15} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
  );
};
