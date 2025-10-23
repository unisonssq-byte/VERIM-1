import { motion } from 'framer-motion';
import { MatrixText } from './ui/MatrixText';
import { WaveDivider } from './ui/WaveDivider';
import styles from './Manifesto.module.css';

export const Manifesto = () => {
  const manifestoLines = [
    'VERA — музыкальная структура, которая работает с тем, что не видно.',
    'Мы не продаём музыку. Мы проектируем веру.',
    'Каждый релиз — гипотеза.',
    'Мы не просим слушать. Мы предлагаем наблюдать.'
  ];

  return (
    <>
      {/* Wave divider at top */}
      <WaveDivider variant="top" color="light" />
      
      <section className={styles.manifesto} id="manifesto">
        {/* Background gradient overlay */}
        <div className={styles.backgroundPattern} />
        
        <div className={styles.container}>
          {/* Glass morphism card containing the manifesto */}
          <motion.div
            className={styles.manifestoCard}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2,
              ease: [0.175, 0.885, 0.32, 1.275] 
            }}
          >
            {/* Card gradient border */}
            <div className={styles.cardBorder} />
            
            {/* Manifesto content */}
            <div className={styles.content}>
              <motion.h2 
                className={styles.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <MatrixText text="MANIFESTO" speed={200} staggerDelay={50} />
              </motion.h2>
              
              <div className={styles.lines}>
                {manifestoLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={styles.lineContainer}
                    initial={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.6 + index * 0.2, 
                      duration: 0.8,
                      ease: [0.2, 0.9, 0.2, 1]
                    }}
                  >
                    <span className={styles.lineNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <p className={styles.line}>
                      <MatrixText text={line} speed={250} staggerDelay={15} />
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Decorative glow effect */}
            <div className={styles.glowEffect} />
          </motion.div>

          {/* Floating artifacts with enhanced styling */}
          <div className={styles.artifacts}>
            {['◆', '◇', '◈'].map((artifact, index) => (
              <motion.span
                key={index}
                className={`${styles.artifact} ${styles[`artifact${index + 1}`]}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 2 + index * 0.2, 
                  duration: 0.6,
                  ease: 'backOut'
                }}
                whileHover={{ 
                  scale: 1.2, 
                  opacity: 0.6,
                  rotate: 45 
                }}
              >
                {artifact}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider at bottom */}
      <WaveDivider variant="bottom" color="dark" />
    </>
  );
};
