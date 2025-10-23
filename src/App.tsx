import './styles/globals.css';
import './styles/animations.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { FAQ } from './components/FAQ';

import { Footer } from './components/Footer';
function App() {
  const [backroomsMode, setBackroomsMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [coordinatesShown, setCoordinatesShown] = useState(false);
  const [isFlying, setIsFlying] = useState(true);

  const [holdTimer, setHoldTimer] = useState<number | null>(null);
  const [coordinates] = useState('21.121686269135598, -11.401066852835761');
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 2, y: 1.5 });
  const [showErrorVideo, setShowErrorVideo] = useState(false);


  // Global click handler for showing coordinates
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the click is on or inside an interactive element
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.tagName === 'SVG' ||
        target.tagName === 'PATH' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('img') ||
        target.closest('[role="button"]') ||
        target.closest('[clickable]') ||
        target.closest('.modal') ||
        target.closest('.coordinates-modal') ||
        target.closest('.error-video-modal') ||
        target.hasAttribute('onclick') ||
        target.style.cursor === 'pointer' ||
        getComputedStyle(target).cursor === 'pointer';

      // Skip if clicking on interactive elements
      if (isInteractive) {
        return;
      }

      // Show coordinates on any click (except interactive elements)
      if (!coordinatesShown) {
        setShowCoordinates(true);
        setCoordinatesShown(true);
        setIsFlying(true);
        setPosition({ x: 0, y: 0 });
        setVelocity({ x: 4 + Math.random() * 3, y: 3 + Math.random() * 3 }); // Random velocity - faster
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [coordinatesShown]);

  // Animation effect for bouncing coordinates
  useEffect(() => {
    if (!isFlying || !showCoordinates) return;

    const animate = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const modalWidth = 300; // Approximate modal width
      const modalHeight = 80; // Approximate modal height
      
      setPosition(prev => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Bounce off left and right walls
        if (newX <= -windowWidth/2 + modalWidth/2 || newX >= windowWidth/2 - modalWidth/2) {
          newVelX = -newVelX;
          newX = Math.max(-windowWidth/2 + modalWidth/2, Math.min(windowWidth/2 - modalWidth/2, newX));
        }

        // Bounce off top and bottom walls
        if (newY <= -windowHeight/2 + modalHeight/2 || newY >= windowHeight/2 - modalHeight/2) {
          newVelY = -newVelY;
          newY = Math.max(-windowHeight/2 + modalHeight/2, Math.min(windowHeight/2 - modalHeight/2, newY));
        }

        setVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [isFlying, showCoordinates, velocity.x, velocity.y]);

  // Functions for catching the flying coordinates modal
  const handleMouseDown = () => {
    if (!isFlying) return;
    
    const timer = window.setTimeout(async () => {
      // Copy coordinates and close modal immediately
      try {
        await navigator.clipboard.writeText(coordinates);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy coordinates:', err);
      }
      
      // Close modal
      setShowCoordinates(false);
      setIsFlying(true);
      setPosition({ x: 0, y: 0 });
      setVelocity({ x: 4, y: 3 });
    }, 1000); // 1 second hold
    
    setHoldTimer(timer);
  };

  const handleMouseUp = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }
  };

  const handleMouseLeave = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }
  };

  // Protection system - right click and F12 detection
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      setShowErrorVideo(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key detection
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        setShowErrorVideo(true);
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Triple-click detection for backrooms mode
  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1);
      setTimeout(() => setClickCount(0), 500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (clickCount >= 3) {
      setBackroomsMode(prev => !prev);
      setClickCount(0);
    }
  }, [clickCount]);

  return (
    <>
      <div className={`app ${backroomsMode ? 'backrooms-mode' : ''}`}>
        <Header />
        <Hero />
        <Features />
        <Projects />
        <FAQ />
        <Footer />
      </div>

      {/* Global Coordinates Modal */}
      <AnimatePresence>
        {showCoordinates && (
          <motion.div
            className="coordinates-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: isFlying ? position.x : 0,
              y: isFlying ? position.y : 0
            }}
            transition={{
              type: "tween",
              duration: 0,
              ease: "linear"
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '24px 50px 24px 32px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '14px',
              letterSpacing: '1px',
              cursor: 'grab',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Status indicator */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 0, 0, 0.8)',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 'bold',
              fontFamily: 'Courier New, monospace',
              letterSpacing: '0.5px'
            }}>
              ЗАЖМИ НА 1 СЕК
            </div>
            
            {coordinates}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy success notification */}
      <AnimatePresence>
        {showCopySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              zIndex: 1001,
              background: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '14px',
              fontWeight: 'bold',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            Ко№рдиh&ты скoпи$ованы
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Protection Video Modal */}
      <AnimatePresence>
        {showErrorVideo && (
          <motion.div
            className="error-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowErrorVideo(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <video 
              autoPlay 
              loop 
              muted
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '60%',
                maxWidth: '800px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <source src="/error.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
