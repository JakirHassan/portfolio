import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contentLoader } from './core/contentLoader';
import { LayoutBuilder } from './components/builder/LayoutBuilder';
import { InteractiveBackground } from './components/InteractiveBackground';
import { CustomCursor } from './components/CustomCursor';
import './App.css';

// Custom inline SVG icons to prevent lucide-react dependency version issues
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

function App() {
  const profile = contentLoader.getProfile();
  const layout = contentLoader.getLayout();
  const visibleSections = layout.filter(sec => sec.visible && sec.type !== 'hero');

  const [activeSection, setActiveSection] = useState('hero');

  // Monitor scroll to highlight active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const allSections = ['hero', ...visibleSections.map(s => s.id)];
      const scrollPosition = window.scrollY + 200;

      for (const section of allSections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  // Nav link click smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background Interactive Canvas and spring cursor */}
      <InteractiveBackground />
      <CustomCursor />

      {/* Dynamic Header */}
      <motion.header 
        className="header glass-panel"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          {profile.name.split(' ')[0]}<span className="logo-dot">.</span>
        </a>
        <nav>
          <ul className="nav-links">
            {visibleSections.map((sec) => (
              <li key={sec.id}>
                <a 
                  href={`#${sec.id}`} 
                  className={`nav-link ${activeSection === sec.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sec.id);
                  }}
                >
                  {sec.subtitle || sec.id.charAt(0).toUpperCase() + sec.id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Main Dynamic Page Layout */}
      <main>
        <LayoutBuilder />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="social-links">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
                  <TwitterIcon size={20} />
                </a>
              )}
            </div>
            <div className="copyright">
              © {new Date().getFullYear()} {profile.name}. Dynamic Multi-Agent Website Builder.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
