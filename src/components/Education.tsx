import { education } from '../data/cv-content';
import './sections.css';
import './education.css';
import '../styles/animations.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Education() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section fade-in-up ${isVisible ? 'visible' : ''}`}
      aria-labelledby="education-heading"
    >
      <div className="container">
        <h2 id="education-heading">Education</h2>
        <ul className="education-list">
          {education.map((entry) => (
            <li key={entry.degree} className="education-item">
              <article className="education-card">
                <h3 className="education-degree">{entry.degree}</h3>
                <p className="education-institution">{entry.institution}</p>
                <p className="education-period">
                  {entry.startYear} - {entry.endYear}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
