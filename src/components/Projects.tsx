import { motion } from 'framer-motion';
import { CardTemplateA } from './ui/CardTemplateA';
import { EinsteinFormula } from './ui/EinsteinFormula';

import styles from './Projects.module.css';

export const Projects = () => {
  const projects = [
    {
      title: 'HYPOTHESIS_01',
      subtitle: 'Идеальное из Хаоса',
      link: 'https://www.google.com/maps/place/22%C2%B055"00.0%22N+10%C2%B024"00.0%22W/@22.9213896,-10.4146262,4934m/data=!3m1!1e3!4m4!3m3!8m2!3d22.9166667!4d-10.4?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      title: 'OBSERVATION_02', 
      subtitle: 'Тишина как текстура',
      link: 'https://www.google.com/maps/place//@35.5235565,-104.5755223,3666m/data=!3m2!1e3!4b1?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      title: 'ARTIFACT_03',
      subtitle: 'Верb', 
      link: 'https://www.google.com/maps/search/%D0%A8%D1%8F%D1%83%D0%BB%D1%8F%D0%B9%D1%81%D0%BA%D0%B8%D0%B9+%D1%83%D0%B5%D0%B7%D0%B4+(C)+Google+2C88%2B3J+Jurgai%C4%8Diai,+%D0%9B%D0%B8%D1%82%D0%B2%D0%B0/@56.0151354,23.4155266,39m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          АРТЕФАКТЫ
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 60,
                  rotateX: -15
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.645, 0.045, 0.355, 1]
                  }
                }
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <CardTemplateA
                title={project.title}
                subtitle={project.subtitle}
                index={index}
                onClickModal={() => window.open(project.link, '_blank')}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <EinsteinFormula />
      </div>
    </section>
  );
};
