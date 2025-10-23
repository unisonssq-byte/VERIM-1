import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './ButtonTemplateB.module.css';

interface ButtonTemplateBProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ButtonTemplateB: React.FC<ButtonTemplateBProps> = ({
  children,
  onClick,
  variant = 'primary',
  icon,
  className = '',
  disabled = false
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      disabled={disabled}
      whileHover={{
        y: -2,
        scale: 1.05,
        boxShadow: variant === 'primary' 
          ? '0 8px 25px rgba(255, 255, 255, 0.2)' 
          : '0 8px 25px rgba(0, 0, 0, 0.4)'
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.2, 0.9, 0.2, 1]
      }}
    >
      {/* Shine effect */}
      <span className={styles.shineEffect}></span>
      
      {/* Corner borders */}
      <div className={styles.cornerBorders}></div>
      
      {/* Button content */}
      <div className={styles.content}>
        {icon && (
          <div className={styles.iconContainer}>
            {icon}
          </div>
        )}
        <span className={styles.text}>{children}</span>
      </div>
    </motion.button>
  );
};
