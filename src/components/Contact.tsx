import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { personalInfo } from '../data/cv-content';
import './sections.css';
import './contact.css';
import '../styles/animations.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Contact() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section contact-footer fade-in-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="container contact-content">
        <h2>Get in Touch</h2>
        <div className="contact-links">
          <a
            href={`mailto:${personalInfo.email}`}
            className="contact-icon"
            aria-label="Email JF_Crespo@outlook.es"
          >
            <MdEmail size={28} aria-hidden="true" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon"
            aria-label="Visit LinkedIn profile"
          >
            <FaLinkedin size={28} aria-hidden="true" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon"
            aria-label="Visit GitHub profile"
          >
            <FaGithub size={28} aria-hidden="true" />
          </a>
        </div>
        <a
          href={import.meta.env.BASE_URL + 'cv.pdf'}
          download="Juan_Francisco_Crespo_CV.pdf"
          className="download-btn"
        >
          Download CV (PDF)
        </a>
      </div>
    </section>
  );
}
