import { skillCategories } from '../data/cv-content';
import './sections.css';
import './skills.css';

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
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
