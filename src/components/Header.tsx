import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchVideo } from './ui/GlitchVideo';
import styles from './Header.module.css';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'VERA' },
    { id: 'features', label: 'About' },
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'merchandise', label: 'Merchandise' },
    { id: 'projects', label: 'Artifacts' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacts', label: 'Contacts' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navItems]);

  const scrollToSection = (sectionId: string) => {
    // Special handling for Manifesto - show video modal instead
    if (sectionId === 'manifesto') {
      setShowVideoModal(true);
      return;
    }
    
    // Special handling for Merchandise - show image modal instead
    if (sectionId === 'merchandise') {
      setShowMerchandiseModal(true);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className={styles.header}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{
            duration: 0.3,
            ease: [0.2, 0.9, 0.2, 1]
          }}
        >
          <div className={styles.container}>
            {/* Logo */}
            <motion.div
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.google.com/maps/place/20%C2%B037\'37.0%22S+166%C2%B018\'02.0%22E/@-20.6254334,166.3050956,886m/data=!3m1!1e3!4m4!3m3!8m2!3d-20.626944!4d166.300556?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D', '_blank');
              }}
            >
              <span className={styles.logoText}>VERA</span>
            </motion.div>

            {/* Navigation */}
            <nav className={styles.nav}>
              <div className={styles.navContainer}>
                {navItems.slice(1).map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`${styles.navItem} ${
                      activeSection === item.id ? styles.active : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToSection(item.id);
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.navLabel}>{item.label}</span>
                    <div className={styles.navGlow} />
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* Actions placeholder - removed theme toggle */}
            <div className={styles.actions}>
              {/* Future actions can be added here */}
            </div>
          </div>

          {/* Backdrop blur overlay */}
          <div className={styles.backdrop} />
        </motion.header>
      )}
      
      {/* Video Modal for Manifesto */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className={styles.videoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
          >
            <GlitchVideo 
              src="/video.mp4"
              className={styles.video}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal for Merchandise */}
      <AnimatePresence>
        {showMerchandiseModal && (
          <motion.div
            className={styles.merchandiseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMerchandiseModal(false)}
          >
            <motion.div
              className={styles.merchandiseContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GlitchVideo 
                src="/video.mp4"
                className={styles.merchandiseVideo}
                onClick={(e) => e.stopPropagation()}
              />
              <motion.button
                className={styles.closeButton}
                onClick={() => setShowMerchandiseModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};