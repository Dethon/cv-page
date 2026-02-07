import './sections.css';
import './experience.css';
import { experiences } from '../data/cv-content';
import { formatDate } from '../types/content';

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <h2 id="experience-heading">Experience</h2>
        <ol className="timeline">
          {experiences.map((entry) => (
            <li key={entry.company} className="timeline-item">
              <article className="experience-card">
                <h3 className="experience-company">{entry.company}</h3>
                {entry.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="experience-role">
                    <h4 className="experience-title">{role.title}</h4>
                    <div className="experience-meta">
                      <time dateTime={role.startDate}>{formatDate(role.startDate)}</time>
                      {' - '}
                      {role.endDate === 'Present' ? (
                        <span>Present</span>
                      ) : (
                        <time dateTime={role.endDate}>{formatDate(role.endDate)}</time>
                      )}
                      {' · '}
                      {role.location}
                    </div>
                    <ul className="experience-achievements">
                      {role.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
