import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQ.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'what-is-vera',
    question: 'Что такое VERA?',
    answer: 'VERA — это инновационный музыкальный лейбл и digital cult, который объединяет музыку, технологии и цифровое искусство. Мы создаём уникальные аудиовизуальные проекты и продвигаем экспериментальное звучание.'
  },
  {
    id: 'how-to-join',
    question: 'Как присоединиться к VERA?',
    answer: 'Вы можете стать частью нашего сообщества, подписавшись на наши социальные сети, участвуя в наших проектах или отправив нам свои демо-записи. Мы всегда открыты для новых талантов и идей.'
  },
  {
    id: 'music-style',
    question: 'Какую музыку выпускает VERA?',
    answer: 'VERA специализируется на экспериментальной электронной музыке, ambient, techno и других жанрах, которые исследуют границы звука. Мы поддерживаем артистов, которые создают инновационное и концептуальное звучание.'
  },
  {
    id: 'submit-demo',
    question: 'Как отправить демо?',
    answer: 'Вы можете отправить свои демо-записи через наши официальные каналы связи. Мы рассматриваем все заявки и обязательно ответим на качественные материалы, которые соответствуют нашему видению.'
  },
  {
    id: 'collaborations',
    question: 'Сотрудничаете ли вы с другими лейблами?',
    answer: 'Да, VERA открыта для коллабораций с другими лейблами, артистами и креативными проектами. Мы верим в силу объединения для создания чего-то по-настоящему уникального и значимого.'
  }
];

export const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className={styles.title}>Часто задаваемые вопросы</h2>
          <p className={styles.subtitle}>
            Всё что вы хотели знать о VERA
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className={styles.faqList}>
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut'
              }}
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Glass morphism background */}
              <div className={styles.itemGlass} />
              
              {/* Question button */}
              <button
                className={`${styles.question} ${
                  openItem === item.id ? styles.active : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <span className={styles.questionText}>{item.question}</span>
                <motion.div
                  className={styles.chevron}
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    className={styles.answer}
                    initial={{ 
                      opacity: 0, 
                      height: 0,
                      y: -10
                    }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      y: 0
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      y: -10
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.175, 0.885, 0.32, 1.275]
                    }}
                  >
                    <div className={styles.answerContent}>
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          className={styles.contactInfo}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className={styles.contactText}>
            Не нашли ответ на свой вопрос?{' '}
            <a href="#contacts" className={styles.contactLink}>
              Свяжитесь с нами
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};