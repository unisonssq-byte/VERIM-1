import { motion } from 'framer-motion';
import styles from './ScrollArrow.module.css';

interface ScrollArrowProps {
  targetId: string;
  className?: string;
}

export const ScrollArrow: React.FC<ScrollArrowProps> = ({ targetId, className = '' }) => {
  const scrollToTarget = () => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const elementPosition = targetSection.offsetTop;
      const offsetPosition = elementPosition - 80; // Отступ 20px сверху
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      className={`${styles.scrollArrow} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      onClick={scrollToTarget}
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
  );
};