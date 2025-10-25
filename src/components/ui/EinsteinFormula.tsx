import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlitchFormula } from './GlitchFormula';
import styles from './EinsteinFormula.module.css';

export const EinsteinFormula = () => {
  const [displayFormula, setDisplayFormula] = useState({
    R1: 'R', sub1: 'μν', minus: ' - ', half: '½', g1: 'g', sub2: 'μν', R2: 'R', plus: ' + ', 
    lambda: 'Λ', g2: 'g', sub3: 'μν', equals: ' = ', numerator: '8πG', c: 'c', sup: '4', T: 'T', sub4: 'μν'
  });
  
  const [duplicates, setDuplicates] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);
  
  const originalFormula = {
    R1: 'R', sub1: 'μν', minus: ' - ', half: '½', g1: 'g', sub2: 'μν', R2: 'R', plus: ' + ', 
    lambda: 'Λ', g2: 'g', sub3: 'μν', equals: ' = ', numerator: '8πG', c: 'c', sup: '4', T: 'T', sub4: 'μν'
  };
  
  const glitchChars = ['█', '░', '▓', '▒', '╬', '╣', '║', '╗', '╝', '╚', '╔', '╩', '╦', '╠', '═', '¤', '◊', '§', '¶', '†', '‡', '•', '‰', '‹', '›', '¿', '¡', '¢', '£', '¥', '€', '©', '®', '™', 'Ω', 'Σ', 'Δ', 'Φ', 'Ψ', 'Θ'];
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 40% шанс на глитч
        const keys = Object.keys(originalFormula);
        const glitchedFormula = { ...originalFormula };
        const glitchCount = Math.floor(Math.random() * 3) + 1; // 1-3 элемента
        
        for (let i = 0; i < glitchCount; i++) {
          const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof originalFormula;
          const glitchType = Math.random();
          
          if (glitchType > 0.7) {
            // Заменить символ
            glitchedFormula[randomKey] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else if (glitchType > 0.4) {
            // Дублировать символ
            glitchedFormula[randomKey] = originalFormula[randomKey] + glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            // Исказить символ
            glitchedFormula[randomKey] = glitchChars[Math.floor(Math.random() * glitchChars.length)] + originalFormula[randomKey];
          }
        }
        
        setDisplayFormula(glitchedFormula);
        
        // Иногда зависаем на дольше
        const hangTime = Math.random() > 0.1 ? Math.random() * 1000 + 500 : Math.random() * 200 + 80;
        
        setTimeout(() => {
          setDisplayFormula({ ...originalFormula });
        }, hangTime);
      }
    }, Math.random() * 2000 + 200); // каждые 800ms - 2.8s
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Эффект дублирования формулы
  useEffect(() => {
    const duplicateInterval = setInterval(() => {
      if (Math.random() > 0.999999) { // 100% шанс на дублирование для тестирования
        const newDuplicates: Array<{id: number, x: number, y: number, opacity: number}> = [];
        const duplicateCount = Math.floor(Math.random() * 4) + 2; // 2-5 дубликатов
        
        for (let i = 0; i < duplicateCount; i++) {
          newDuplicates.push({
            id: Math.random(),
            x: (Math.random() - 0.5) * 100, // -50px до 50px
            y: Math.random() * 80 + 20, // 20px до 100px вниз
            opacity: Math.random() * 0.6 + 0.2 // 0.2 до 0.8
          });
        }
        
        setDuplicates(newDuplicates);
        
        // Быстро убираем дубликаты
        setTimeout(() => {
          setDuplicates([]);
        }, Math.random() * 200 + 100); // 100-300ms
      }
    }, Math.random() * 4000 + 2000); // каждые 2-6 секунд
    
    return () => clearInterval(duplicateInterval);
  }, []);

  return (
    <motion.div
      className={styles.formulaContainer}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <GlitchFormula className={styles.formula}>
        <motion.div
          animate={{
            textShadow: [
              '0 0 10px rgba(255, 255, 255, 0.3)',
              '0 0 20px rgba(255, 255, 255, 0.5)',
              '0 0 10px rgba(255, 255, 255, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
        <span className={styles.formulaContent}>
          <span className={styles.glitchChar}>{displayFormula.R1}</span>
          <sub className={styles.glitchChar}>{displayFormula.sub1}</sub>
          <span className={styles.glitchChar}>{displayFormula.minus}</span>
          <span className={`${styles.fraction} ${styles.glitchChar}`}>{displayFormula.half}</span>
          <span className={styles.glitchChar}>{displayFormula.g1}</span>
          <sub className={styles.glitchChar}>{displayFormula.sub2}</sub>
          <span className={styles.glitchChar}>{displayFormula.R2}</span>
          <span className={styles.glitchChar}>{displayFormula.plus}</span>
          <span className={styles.glitchChar}>{displayFormula.lambda}</span>
          <span className={styles.glitchChar}>{displayFormula.g2}</span>
          <sub className={styles.glitchChar}>{displayFormula.sub3}</sub>
          <span className={styles.glitchChar}>{displayFormula.equals}</span>
        </span>
        <div className={styles.fractionContainer}>
          <div className={`${styles.numerator} ${styles.glitchChar}`}>{displayFormula.numerator}</div>
          <div className={styles.denominator}>
            <span className={styles.glitchChar}>{displayFormula.c}</span>
            <sup className={styles.glitchChar}>{displayFormula.sup}</sup>
          </div>
        </div>
        <span className={styles.formulaContent}>
          <span className={styles.glitchChar}>{displayFormula.T}</span>
          <sub className={styles.glitchChar}>{displayFormula.sub4}</sub>
        </span>
        </motion.div>
      </GlitchFormula>
      
      {/* Дубликаты формулы */}
      {duplicates.map((duplicate) => (
        <motion.div
          key={duplicate.id}
          className={`${styles.formula} ${styles.formulaDuplicate}`}
          style={{
            position: 'absolute',
            transform: `translate(${duplicate.x}px, ${duplicate.y}px)`,
            opacity: duplicate.opacity,
            zIndex: -1,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: duplicate.opacity, 
            scale: [0.8, 1.1, 0.9, 1],
            rotate: [0, Math.random() * 4 - 2, 0]
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <span className={styles.formulaContent}>
            <span>{displayFormula.R1}</span>
            <sub>{displayFormula.sub1}</sub>
            <span>{displayFormula.minus}</span>
            <span className={styles.fraction}>{displayFormula.half}</span>
            <span>{displayFormula.g1}</span>
            <sub>{displayFormula.sub2}</sub>
            <span>{displayFormula.R2}</span>
            <span>{displayFormula.plus}</span>
            <span>{displayFormula.lambda}</span>
            <span>{displayFormula.g2}</span>
            <sub>{displayFormula.sub3}</sub>
            <span>{displayFormula.equals}</span>
          </span>
          <div className={styles.fractionContainer}>
            <div className={styles.numerator}>{displayFormula.numerator}</div>
            <div className={styles.denominator}>
              <span>{displayFormula.c}</span>
              <sup>{displayFormula.sup}</sup>
            </div>
          </div>
          <span className={styles.formulaContent}>
            <span>{displayFormula.T}</span>
            <sub>{displayFormula.sub4}</sub>
          </span>
        </motion.div>
      ))}
      
      <motion.div
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        FIELD EQUATIONS
        <br></br>
        <div className={styles.coordsHint}>

          <span className={styles.hintText}>Координаты кроются в темноте</span>
          <br></br>
          
          <span className={styles.hiddenCoords} title="Скрытые координаты - выделите текст для копирования">
            21.121686269135598, -11.401066852835761
          </span>
        </div>
      </motion.div>
    
    </motion.div>
    
  );
};