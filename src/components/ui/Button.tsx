import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glow';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  style = {}
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'glow': return 'btn-glow';
      default: return 'btn-primary';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClass()} ${className}`}
      style={style}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};
