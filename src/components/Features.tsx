import { motion } from 'framer-motion';
import styles from './Features.module.css';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: 'digital-cult',
    title: 'Digital Cult',
    description: 'Мы создаём цифровую культуру нового поколения, объединяя технологии и искусство в единое целое.',
    icon: '⚡'
  },
  {
    id: 'music-label',
    title: 'Music Label',
    description: 'VERA - это не просто лейбл, это движение, которое продвигает уникальное звучание и экспериментальную музыку.',
    icon: '🎵'
  },
  {
    id: 'tech-innovation',
    title: 'Community',
    description: 'Создаём сообщество единомышленников, объединённых любовью к музыке и искусству.',
    icon: '🔮'
  }
];

export const Features = () => {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        {/* Section title */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className={styles.title}>Что такое VERA</h2>
          <p className={styles.subtitle}>
            Мы объединяем музыку, технологии и цифровое искусство в единую экосистему будущего
          </p>
        </motion.div>

        {/* Features grid */}
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Glass morphism background */}
              <div className={styles.cardGlass} />
              
              {/* Gradient border */}
              <div className={styles.cardBorder} />
              
              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
              </div>
              
              {/* Hover glow effect */}
              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};