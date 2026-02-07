import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}

export default App;
