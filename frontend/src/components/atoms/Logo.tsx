import React from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}


import logo from '../../assets/logo.svg';


const companyName = import.meta.env.VITE_COMPANY_NAME || 'Mecânica SHALLON';

const Logo: React.FC<LogoProps> = ({ className = '', style }) => (
  <img
    src={logo}
    alt={`Logo ${companyName}`}
    className={className}
    style={style}
    draggable={false}
  />
);

export default Logo;
