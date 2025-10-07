import React from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Nexum';

const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <div 
    className={`flex-1 bg-[url('/logo.svg')] bg-no-repeat bg-contain bg-center h-[100px] ${className}`} 
    aria-label={`Logo ${companyName}`}
  />
);

export default Logo;
