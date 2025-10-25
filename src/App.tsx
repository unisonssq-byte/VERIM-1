import './styles/globals.css';
import './styles/animations.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { SocialLinks } from './components/SocialLinks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Projects />
        <SocialLinks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default App;