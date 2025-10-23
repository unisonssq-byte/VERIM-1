import { useEffect, useState, useRef } from 'react';
import styles from './MatrixText.module.css';

interface MatrixTextProps {
  text: string;
  speed?: number; // ms per character stabilization
  staggerDelay?: number; // ms delay between characters
  charset?: string;
  className?: string;
  onComplete?: () => void;
}

const DEFAULT_CHARSET = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя' +
  '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

export const MatrixText: React.FC<MatrixTextProps> = ({
  text,
  speed = 250,
  staggerDelay = 30,
  charset = DEFAULT_CHARSET,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing intervals
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    
    const chars = text.split('');
    const iterations = Math.ceil(speed / 40); // 40ms per iteration
    
    setDisplayText(chars.map(() => ' '));
    
    chars.forEach((finalChar, index) => {
      const startTime = index * staggerDelay;
      
      setTimeout(() => {
        let currentIteration = 0;
        
        const interval = setInterval(() => {
          currentIteration++;
          
          if (currentIteration < iterations) {
            // Show random character
            const randomChar = charset[Math.floor(Math.random() * charset.length)];
            setDisplayText(prev => {
              const newText = [...prev];
              newText[index] = randomChar;
              return newText;
            });
          } else {
            // Stabilize to final character
            setDisplayText(prev => {
              const newText = [...prev];
              newText[index] = finalChar;
              return newText;
            });
            clearInterval(interval);
            
            // Check if all characters are complete
            if (index === chars.length - 1) {
              setIsComplete(true);
              onComplete?.();
            }
          }
        }, 40);
        
        intervalsRef.current.push(interval);
      }, startTime);
    });
    
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, [text, speed, staggerDelay, charset, onComplete]);

  return (
    <span className={`${styles.matrixText} ${className} ${isComplete ? styles.complete : ''}`}>
      {displayText.join('')}
    </span>
  );
};
