import { skillCategories } from '../data/cv-content';
import './sections.css';
import './skills.css';
import '../styles/animations.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Skills() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section fade-in-up ${isVisible ? 'visible' : ''}`}
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <h2 id="skills-heading">Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.category} className="skill-category">
              <h3>{category.category}</h3>
              <ul className="skill-list">
                {category.skills.map((skill) => (
                  <li key={skill} className="skill-tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
