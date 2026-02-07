import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3.5C10 3.22386 9.77614 3 9.5 3C9.22386 3 9 3.22386 9 3.5V5C9 5.27614 9.22386 5.5 9.5 5.5C9.77614 5.5 10 5.27614 10 5V3.5Z" fill="currentColor"/>
          <path d="M15.5 9C15.2239 9 15 9.22386 15 9.5C15 9.77614 15.2239 10 15.5 10H17C17.2761 10 17.5 9.77614 17.5 9.5C17.5 9.22386 17.2761 9 17 9H15.5Z" fill="currentColor"/>
          <path d="M10 13.5C10 13.2239 9.77614 13 9.5 13C9.22386 13 9 13.2239 9 13.5V15C9 15.2761 9.22386 16 9.5 16C9.77614 16 10 15.2761 10 15V13.5Z" fill="currentColor"/>
          <path d="M4 9.5C4 9.22386 3.77614 9 3.5 9H2C1.72386 9 1.5 9.22386 1.5 9.5C1.5 9.77614 1.72386 10 2 10H3.5C3.77614 10 4 9.77614 4 9.5Z" fill="currentColor"/>
          <path d="M9.5 6C7.567 6 6 7.567 6 9.5C6 11.433 7.567 13 9.5 13C11.433 13 13 11.433 13 9.5C13 7.567 11.433 6 9.5 6Z" fill="currentColor"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2C9.44772 2 9 2.44772 9 3C9 3.55228 9.44772 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 9.44772 3.55228 9 3 9C2.44772 9 2 9.44772 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" fill="currentColor"/>
        </svg>
      )}
      <style>{`
        .theme-toggle {
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .theme-toggle:hover {
          color: var(--text-primary);
        }

        @media (prefers-reduced-motion: reduce) {
          .theme-toggle {
            transition: none;
          }
        }
      `}</style>
    </button>
  );
}
