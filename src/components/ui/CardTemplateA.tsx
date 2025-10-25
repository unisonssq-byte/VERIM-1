import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';
import styles from './CardTemplateA.module.css';

interface CardTemplateAProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  onClickModal?: () => void;
  index?: number;
  className?: string;
}

export const CardTemplateA: React.FC<CardTemplateAProps> = ({
  title,
  subtitle,
  icon,
  onClickModal,
  index = 0,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.175, 0.885, 0.32, 1.275]
      }}
      whileHover={{
        y: -15,
        rotateX: 10,
        rotateY: -10,
        scale: 1.05
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (onClickModal) onClickModal();
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {/* Дополнительные угловые элементы */}
      <div className={styles.cornerTopLeft}></div>
      <div className={styles.cornerBottomRight}></div>
      
      {/* Glass card overlay */}
      <div className={styles.cardOverlay} />
      
      {/* Gradient border effect */}
      <div className={styles.gradientBorder} />
      
      {/* Content wrapper for 3D effect */}
      <div className={styles.cardContent}>
        {/* Icon container */}
        {icon && (
          <div className={styles.iconContainer}>
            <div className={styles.iconGlow} />
            <div className={styles.iconContent}>
              {icon}
            </div>
          </div>
        )}
        
        {/* Title */}
        <h3 className={styles.title}>{title}</h3>
        
        {/* Subtitle */}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      
      {/* Bottom glow line */}
      <div className={styles.glowLine} />
      
      {/* Hover overlay */}
      <motion.div
        className={styles.hoverOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      

    </motion.div>
  );
};
