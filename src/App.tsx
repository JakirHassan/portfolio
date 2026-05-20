import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Mail, 
  Check, 
  Award, 
  Cpu, 
  Code2, 
  Briefcase, 
  X 
} from 'lucide-react';
import { portfolioData, type Project } from './data/portfolioData';
import { InteractiveBackground } from './components/InteractiveBackground';
import { CustomCursor } from './components/CustomCursor';
import { SpotlightCard } from './components/SpotlightCard';
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
  const { personalInfo, skills, projects, experiences } = portfolioData;
  
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Monitor scroll to highlight active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
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
  }, []);

  // Form submit simulator
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Nav link click smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background Interactive Elements */}
      <InteractiveBackground />
      <CustomCursor />

      {/* Floating Header */}
      <motion.header 
        className="header glass-panel"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          {personalInfo.name.split(' ')[0]}<span className="logo-dot">.</span>
        </a>
        <nav>
          <ul className="nav-links">
            {['projects', 'skills', 'experience', 'contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className={`nav-link ${activeSection === item ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="grid-overlay" />
        <div className="glow-top-left ambient-glow" />
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-badge"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Award size={14} /> Shipping high-impact features
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Scaling Products with <span className="text-gradient">Data & Design</span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {personalInfo.subTitle}
            </motion.p>

            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                Explore Case Studies <ArrowUpRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Case Studies</span>
            <h2 className="section-title">Product Initiatives & Launches</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <SpotlightCard 
                  className="project-card"
                  glowColor={project.glowColor}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-header">
                    <div className="project-meta">
                      <span className="project-cat">{project.category}</span>
                      <ArrowUpRight className="project-arrow" size={20} />
                    </div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.description}</p>
                  </div>
                  <div className="project-tech">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-badge">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Project Modal Popover */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="modal-content glass-panel"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 30px 60px -20px rgba(0,0,0,0.8), 0 0 40px ${selectedProject.glowColor}`,
                borderColor: selectedProject.glowColor
              }}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={24} />
              </button>
              
              <span className="project-cat" style={{ fontSize: '13px' }}>{selectedProject.category}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-desc">{selectedProject.longDescription}</p>
              
              <div className="project-tech">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="tech-badge" style={{ padding: '6px 12px' }}>{tech}</span>
                ))}
              </div>

              <div className="modal-actions">
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                    View Project <ArrowUpRight size={16} />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                    View Source <GithubIcon size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Progress Bars Section */}
      <section id="skills">
        <div className="glow-bottom-right ambient-glow" />
        <div className="container">
          <div className="skills-container">
            <motion.div 
              className="skills-intro"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">Core Competencies</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
                Product Leadership Toolkit
              </h2>
              <p>
                {personalInfo.bio}
              </p>
              <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Cpu size={18} className="text-gradient" />
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Data-Driven Discovery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Code2 size={18} className="text-gradient-purple" />
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Technical Strategy</span>
                </div>
              </div>
            </motion.div>

            <div className="skills-categories">
              {/* Strategy & Growth Skills */}
              <div>
                <h3 className="skills-category-title">
                  <span style={{ color: 'var(--color-primary)' }}>//</span> Strategy & Growth Loops
                </h3>
                <div className="skill-list">
                  {skills.filter(s => s.category === 'strategy').map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <motion.div 
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics & Tools Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Analytics column */}
                <div>
                  <h3 className="skills-category-title" style={{ fontSize: '16px' }}>
                    <span style={{ color: 'var(--color-secondary)' }}>//</span> Data & Analytics
                  </h3>
                  <div className="skill-list" style={{ gap: '12px' }}>
                    {skills.filter(s => s.category === 'analytics').map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-info" style={{ fontSize: '13px' }}>
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-bar-bg" style={{ height: '4px' }}>
                          <motion.div 
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{ background: 'var(--color-secondary)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical/Specs column */}
                <div>
                  <h3 className="skills-category-title" style={{ fontSize: '16px' }}>
                    <span style={{ color: 'var(--color-accent)' }}>//</span> Technical Delivery
                  </h3>
                  <div className="skill-list" style={{ gap: '12px' }}>
                    {skills.filter(s => s.category === 'technical').map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-info" style={{ fontSize: '13px' }}>
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-bar-bg" style={{ height: '4px' }}>
                          <motion.div 
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{ background: 'var(--color-accent)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Timeline</span>
            <h2 className="section-title">Professional Path</h2>
          </div>

          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content glass-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <span className="timeline-company">{exp.company}</span>
                    </div>
                    <span className="timeline-duration">{exp.duration}</span>
                  </div>
                  <ul className="timeline-desc">
                    {exp.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Get in touch</span>
            <h2 className="section-title">Let's Connect</h2>
          </div>

          <div className="contact-container">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p style={{ marginBottom: '12px' }}>
                Have an exciting project you want to build or a team role you'd like to discuss? 
                Drop a message or reach out via my links. I will get back to you as soon as possible.
              </p>

              <div className="contact-card glass-panel">
                <div className="contact-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-label">Email Me</div>
                  <a href={`mailto:${personalInfo.email}`} className="contact-value">{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-card glass-panel">
                <div className="contact-icon-wrapper" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(0,180,255,0.2)' }}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="contact-label">Availability</div>
                  <span className="contact-value" style={{ color: 'var(--color-primary)' }}>Open to Contracts & Full-time Roles</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="contact-form glass-panel" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className="form-input" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com" 
                    className="form-input" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..." 
                    className="form-input" 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSubmitting || isSubmitted}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isSubmitting ? (
                    'Transmitting message...'
                  ) : isSubmitted ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#040815' }}>
                      <Check size={16} /> Transmission Success
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {isSubmitted && (
                  <motion.div 
                    className="submit-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you! Your message was simulated successfully.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="social-links">
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
              )}
              {personalInfo.twitter && (
                <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
                  <TwitterIcon size={20} />
                </a>
              )}
            </div>
            <div className="copyright">
              © {new Date().getFullYear()} {personalInfo.name}. Built with Vite + React + Framer Motion.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
