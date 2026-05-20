import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Mail, Check, ArrowUpRight, Cpu, Code2 } from 'lucide-react';
import { contentLoader, type CaseStudy, type Article } from '../../core/contentLoader';
import { SpotlightCard } from '../SpotlightCard';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface SectionConfig {
  id: string;
  type: 'hero' | 'case-studies' | 'skills' | 'experience' | 'articles' | 'contact';
  visible: boolean;
  title?: string;
  subtitle?: string;
  customProps?: Record<string, any>;
}

interface SectionBuilderProps {
  config: SectionConfig;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onSelectArticle: (article: Article) => void;
  // Contact Form parameters passed down
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
  onContactFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onContactFormSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export const SectionBuilder: React.FC<SectionBuilderProps> = ({
  config,
  onSelectCaseStudy,
  onSelectArticle,
  contactForm,
  onContactFormChange,
  onContactFormSubmit,
  isSubmitting,
  isSubmitted
}) => {
  if (!config.visible) return null;

  const profile = contentLoader.getProfile();

  switch (config.type) {
    case 'hero':
      return (
        <section id={config.id} className="hero-section">
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
                <Award size={14} /> {config.subtitle || 'Shipping high-impact features'}
              </motion.div>
              
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {config.title || 'Scaling Products with Data & Design'}
              </motion.h1>

              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {profile.subTitle}
              </motion.p>

              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button variant="primary" onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Case Studies <ArrowUpRight size={18} />
                </Button>
                <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get In Touch
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      );

    case 'case-studies':
      const studies = contentLoader.getCaseStudies();
      return (
        <section id={config.id}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">{config.subtitle || 'Case Studies'}</span>
              <h2 className="section-title">{config.title || 'Product Initiatives & Launches'}</h2>
            </div>

            <div className="projects-grid">
              {studies.map((project, index) => (
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
                    onClick={() => onSelectCaseStudy(project)}
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
                        <Badge key={tech} variant="default">{tech}</Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="default">+{project.technologies.length - 3} more</Badge>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'skills':
      // Fetch skills from standard config list (for display simplicity we can load pre-compiled layout categories)
      // Category strategy skill list
      const strategySkills = [
        { name: "Product Strategy & OKRs", level: 95 },
        { name: "A/B Testing & Experimentation", level: 92 },
        { name: "User Retention & Growth Loops", level: 90 },
        { name: "Roadmapping & Prioritization", level: 95 }
      ];
      const analyticsSkills = [
        { name: "Product Analytics", level: 92 },
        { name: "SQL Querying", level: 85 },
        { name: "Market & Churn Analysis", level: 85 }
      ];
      const technicalSkills = [
        { name: "API Spec Writing", level: 88 },
        { name: "UI/UX Wireframing", level: 82 },
        { name: "Agile Leadership", level: 94 }
      ];

      return (
        <section id={config.id}>
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
                <span className="section-label">{config.subtitle || 'Core Competencies'}</span>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
                  {config.title || 'Product Leadership Toolkit'}
                </h2>
                <p>{profile.bio}</p>
                <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
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
                {/* Strategy Skills */}
                <div>
                  <h3 className="skills-category-title">
                    <span style={{ color: 'var(--color-primary)' }}>//</span> Strategy & Growth Loops
                  </h3>
                  <div className="skill-list">
                    {strategySkills.map((skill) => (
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

                {/* Sub columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <h3 className="skills-category-title" style={{ fontSize: '16px' }}>
                      <span style={{ color: 'var(--color-secondary)' }}>//</span> Data & Analytics
                    </h3>
                    <div className="skill-list" style={{ gap: '12px' }}>
                      {analyticsSkills.map((skill) => (
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

                  <div>
                    <h3 className="skills-category-title" style={{ fontSize: '16px' }}>
                      <span style={{ color: 'var(--color-accent)' }}>//</span> Technical Delivery
                    </h3>
                    <div className="skill-list" style={{ gap: '12px' }}>
                      {technicalSkills.map((skill) => (
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
      );

    case 'experience':
      const jobs = contentLoader.getResume();
      return (
        <section id={config.id}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">{config.subtitle || 'Timeline'}</span>
              <h2 className="section-title">{config.title || 'Professional Path'}</h2>
            </div>

            <div className="timeline">
              {jobs.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="timeline-dot" />
                  <Card className="timeline-content" animateHover={false}>
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
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'articles':
      const articles = contentLoader.getArticles();
      if (articles.length === 0) return null;
      return (
        <section id={config.id}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">{config.subtitle || 'Publications'}</span>
              <h2 className="section-title">{config.title || 'Articles & Deep Dives'}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
              {articles.map((art, index) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="article-row-card"
                    onClick={() => onSelectArticle(art)}
                    style={{ cursor: 'pointer', padding: '24px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                          {art.date}
                        </span>
                        <h3 style={{ fontSize: '18px', margin: '8px 0', color: 'var(--color-text-primary)', transition: 'color 0.3s ease' }} className="article-title-link">
                          {art.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {art.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        {art.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'contact':
      return (
        <section id={config.id}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">{config.subtitle || 'Get in touch'}</span>
              <h2 className="section-title">{config.title || "Let's Connect"}</h2>
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
                  Have an exciting product challenge or a developer platform initiative you'd like to discuss? 
                  Drop a message or reach out via email. I will respond within 24 hours.
                </p>

                <div className="contact-card glass-panel">
                  <div className="contact-icon-wrapper">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-label">Email Me</div>
                    <a href={`mailto:${profile.email}`} className="contact-value">{profile.email}</a>
                  </div>
                </div>

                <div className="contact-card glass-panel">
                  <div className="contact-icon-wrapper" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(0,180,255,0.2)' }}>
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="contact-label">Availability</div>
                    <span className="contact-value" style={{ color: 'var(--color-primary)' }}>Open to Contracts & Lead Roles</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form className="contact-form glass-panel" onSubmit={onContactFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={contactForm.name}
                      onChange={onContactFormChange}
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
                      value={contactForm.email}
                      onChange={onContactFormChange}
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
                      value={contactForm.message}
                      onChange={onContactFormChange}
                      placeholder="Tell me about your project..." 
                      className="form-input" 
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary"
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
                  </Button>

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
      );

    default:
      return null;
  }
};
