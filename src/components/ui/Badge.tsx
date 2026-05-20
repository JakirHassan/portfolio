import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  style = {}
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'tech-badge-primary';
      case 'secondary': return 'tech-badge-secondary';
      case 'accent': return 'tech-badge-accent';
      default: return 'tech-badge';
    }
  };

  return (
    <span 
      className={`${getVariantClass()} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};
