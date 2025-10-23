import { motion } from 'framer-motion';
import { CardTemplateA } from './ui/CardTemplateA';
import styles from './Projects.module.css';

export const Projects = () => {
  const projects = [
    {
      title: 'HYPOTHESIS_01',
      subtitle: 'Звук, который ищет слушателя',
      link: 'https://www.google.com/maps/@65.0931618,28.9031144,3a,76.4y,128.64h,74.08t/data=!3m7!1e1!3m5!1sycYGceJ1RC2egUP9BawFOQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D15.915191086215302%26panoid%3DycYGceJ1RC2egUP9BawFOQ%26yaw%3D128.64108868493295!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      title: 'OBSERVATION_02', 
      subtitle: 'Тишина как текстура',
      link: 'https://www.google.com/maps/place//@35.5235565,-104.5755223,3666m/data=!3m2!1e3!4b1?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      title: 'ARTIFACT_03',
      subtitle: 'Эхо забытых частот', 
      link: 'https://www.google.com/maps/place/Lisakovsk+Pentagram/@52.479645,62.1858809,485m/data=!3m1!1e3!4m6!3m5!1s0x43d2a2f6252b363d:0x82fa95ca394f2e6f!8m2!3d52.4796784!4d62.1857218!16s%2Fg%2F11csb2p77d?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'
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
      </div>
    </section>
  );
};
