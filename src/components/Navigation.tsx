import { useState, useMemo } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';
import './Navigation.css';

interface NavSection {
  id: string;
  label: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Create stable array of section IDs for useActiveSection
  const sectionIds = useMemo(
    () => ['hero', ...NAV_SECTIONS.map((section) => section.id)],
    []
  );

  const activeSection = useActiveSection(sectionIds);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <a href="#hero" className="nav__title" onClick={handleLinkClick}>
          Juan Francisco Crespo Galan
        </a>

        <button
          className="nav__hamburger"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="nav__hamburger-line"></span>
          <span className="nav__hamburger-line"></span>
          <span className="nav__hamburger-line"></span>
        </button>

        <div className="nav__controls">
          <ul className="nav__list">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`nav__link ${
                    activeSection === section.id ? 'nav__link--active' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
