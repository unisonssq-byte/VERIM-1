import { motion } from 'framer-motion';
import styles from './SocialLinks.module.css';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Telegram',
    url: 'https://t.me/veracorp',
    icon: '/telegram.png'
  },
  {
    name: 'Instagram', 
    url: 'https://www.instagram.com/vera.crpn',
    icon: '/instagram.png'
  }
];

export const SocialLinks = () => {
  return (
    <section className={styles.socialSection} id="social">
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          СЛЕДИ ЗА НАМИ
        </motion.h2>
        
        <div className={styles.socialGrid}>
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBlock}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.08
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Дополнительные угловые элементы */}
              <div className={styles.cornerTopLeft}></div>
              <div className={styles.cornerBottomRight}></div>
              
              <div className={styles.iconContainer}>
                <img 
                  src={social.icon} 
                  alt={social.name}
                  className={styles.socialIcon}
                />
              </div>
              
              <h3 className={styles.socialName}>{social.name}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};