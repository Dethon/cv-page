import { personalInfo } from '../data/cv-content';
import './sections.css';
import './hero.css';

export function Hero() {
  return (
    <section id="hero" className="section section--hero" aria-label="Introduction">
      <div className="container">
        <div className="hero-content">
          <div className="hero-photo">
            <div className="hero-avatar">JFC</div>
          </div>
          <div className="hero-text">
            <h1>{personalInfo.name}</h1>
            <p className="subtitle">{personalInfo.title}</p>
            <p className="hero-summary">{personalInfo.summary}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
