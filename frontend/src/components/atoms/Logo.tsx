import React from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const companyName = import.meta.env.VITE_COMPANY_NAME || 'Nexum';

const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <div
    role="img"
    aria-label={`Logotipo "${companyName}"`}
    className={`flex-1 bg-[url('/logo.svg')] bg-no-repeat bg-contain bg-center h-[100px] ${className}`}
  />
);

export default Logo;
