import { motion } from 'framer-motion';
import styles from './WaveDivider.module.css';

interface WaveDividerProps {
  variant?: 'top' | 'bottom' | 'both';
  color?: 'light' | 'dark';
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  variant = 'bottom',
  color = 'light',
  className = ''
}) => {
  const WaveSVG = ({ flip = false }) => (
    <motion.svg
      className={`${styles.wave} ${flip ? styles.flipped : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      initial={{ opacity: 0, y: flip ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <path
        className={`${styles.wavePath} ${styles[color]}`}
        d="M0,0 C300,80 600,100 900,80 C1200,60 1440,80 1440,0 L1440,120 L0,120 Z"
      />
    </motion.svg>
  );

  return (
    <div className={`${styles.divider} ${styles[variant]} ${className}`}>
      {variant === 'top' && <WaveSVG flip={true} />}
      {variant === 'bottom' && <WaveSVG />}
      {variant === 'both' && (
        <>
          <WaveSVG flip={true} />
          <WaveSVG />
        </>
      )}
    </div>
  );
};