import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { contentLoader, type CaseStudy, type Article } from '../../core/contentLoader';
import { SectionBuilder } from './SectionBuilder';

export const LayoutBuilder: React.FC = () => {
  const layout = contentLoader.getLayout();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Loop through layout schema and render each section */}
      {layout.map((sec) => (
        <SectionBuilder
          key={sec.id}
          config={sec}
          onSelectCaseStudy={setSelectedCaseStudy}
          onSelectArticle={setSelectedArticle}
          contactForm={formData}
          onContactFormChange={handleInputChange}
          onContactFormSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
        />
      ))}

      {/* Case Study Detail Modal Popover */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div 
              className="modal-content glass-panel"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 30px 60px -20px rgba(0,0,0,0.8), 0 0 40px ${selectedCaseStudy.glowColor}`,
                borderColor: selectedCaseStudy.glowColor
              }}
            >
              <button className="modal-close" onClick={() => setSelectedCaseStudy(null)}>
                <X size={24} />
              </button>
              
              <span className="project-cat" style={{ fontSize: '13px' }}>{selectedCaseStudy.category}</span>
              <h2 className="modal-title">{selectedCaseStudy.title}</h2>
              
              <div className="modal-body" style={{ margin: '20px 0', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                {selectedCaseStudy.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={idx} style={{ fontSize: '18px', color: 'var(--color-primary)', marginTop: '20px', marginBottom: '10px' }}>{paragraph.replace('## ', '')}</h3>;
                  }
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={idx} style={{ fontSize: '22px', color: 'var(--color-text-primary)', margin: '20px 0' }}>{paragraph.replace('# ', '')}</h2>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} style={{ paddingLeft: '20px', margin: '10px 0' }}>
                        {paragraph.split('\n').map((li, lidx) => (
                          <li key={lidx} style={{ color: 'var(--color-text-secondary)', marginBottom: '6px', lineHeight: 1.5 }}>{li.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>{paragraph}</p>;
                })}
              </div>
              
              <div className="project-tech">
                {selectedCaseStudy.technologies.map((tech) => (
                  <span key={tech} className="tech-badge" style={{ padding: '6px 12px' }}>{tech}</span>
                ))}
              </div>

              <div className="modal-actions" style={{ marginTop: '24px' }}>
                <a href="https://github.com/JakirHassan" target="_blank" rel="noreferrer" className="btn-primary">
                  View Repository <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Detail Modal Popover */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              className="modal-content glass-panel"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8), 0 0 30px rgba(170, 59, 255, 0.2)',
                borderColor: 'rgba(170, 59, 255, 0.4)'
              }}
            >
              <button className="modal-close" onClick={() => setSelectedArticle(null)}>
                <X size={24} />
              </button>
              
              <span className="project-cat" style={{ fontSize: '13px' }}>{selectedArticle.date}</span>
              <h2 className="modal-title">{selectedArticle.title}</h2>
              
              <div className="modal-body" style={{ margin: '20px 0', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={idx} style={{ fontSize: '18px', color: 'var(--color-secondary)', marginTop: '20px', marginBottom: '10px' }}>{paragraph.replace('## ', '')}</h3>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h4 key={idx} style={{ fontSize: '16px', color: 'var(--color-accent)', marginTop: '16px', marginBottom: '8px' }}>{paragraph.replace('### ', '')}</h4>;
                  }
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={idx} style={{ fontSize: '22px', color: 'var(--color-text-primary)', margin: '20px 0' }}>{paragraph.replace('# ', '')}</h2>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} style={{ paddingLeft: '20px', margin: '10px 0' }}>
                        {paragraph.split('\n').map((li, lidx) => (
                          <li key={lidx} style={{ color: 'var(--color-text-secondary)', marginBottom: '6px', lineHeight: 1.5 }}>{li.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>{paragraph}</p>;
                })}
              </div>
              
              <div className="project-tech">
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="tech-badge" style={{ padding: '6px 12px', background: 'rgba(170, 59, 255, 0.1)', borderColor: 'rgba(170, 59, 255, 0.2)' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
