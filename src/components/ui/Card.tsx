import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  animateHover = true,
  onClick,
  style = {}
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card ${onClick ? 'interactive-card' : ''} ${className}`}
      style={style}
      whileHover={animateHover && onClick ? { 
        y: -4, 
        borderColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px -15px rgba(2, 4, 8, 0.7)'
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};
