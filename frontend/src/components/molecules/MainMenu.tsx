import menu from './mock/menu.json';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';
import type { MainMenuType } from '../../types';
import { useMainContext } from '../../hooks/useMainContext';

import HomeIcon from '../../assets/icons/main-menu-home.svg?react';
import AboutIcon from '../../assets/icons/main-menu-about.svg?react';
import ServicesIcon from '../../assets/icons/main-menu-services.svg?react';
import ContactIcon from '../../assets/icons/main-menu-contact.svg?react';
import LoginIcon from '../../assets/icons/main-menu-login.svg?react';
import MgmtIcon from '../../assets/icons/main-menu-management.svg?react';
import ThemeIcon from '../../assets/icons/main-menu-theme.svg?react';

const iconMap: Record<string, React.ReactNode> = {
  "main-menu-home": <HomeIcon className="fill-current"/>,
  "main-menu-about": <AboutIcon className="fill-current"/>,
  "main-menu-services": <ServicesIcon className="fill-current"/>,
  "main-menu-contact": <ContactIcon className="fill-current"/>,
  "main-menu-login": <LoginIcon className="fill-current"/>,
  "main-menu-management": <MgmtIcon className="fill-current"/>,
  "main-menu-theme": <ThemeIcon className="fill-current"/>,
};

const menuItems = menu as MainMenuType;

export function MainMenu() {
  const { token, theme, handleThemeChange } = useMainContext();
  const currentPage = window.location.hash;

  const getIcon = (itemIcon: MainMenuType[number]['icon']): React.ReactNode => {
    if (typeof itemIcon === 'object' && itemIcon.name) {
      const IconComponent = iconMap[itemIcon.name];
      return (
        <span style={{ transform: `rotate(${itemIcon.rotation || 0}deg)` }}>
          {IconComponent}
        </span>
      );
    }
    if (typeof itemIcon === 'string') {
      return iconMap[itemIcon];
    }
    return null;
  };

  const defaultLinkElement = (item: MainMenuType[number], i: number) => (
    <Link key={`${item.title}-${i}`} to={item.link} aria-label={`Link para acessar a página '${item.title}'`}>
      <Button
        icon={getIcon(item.icon)} 
        className={`
          bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow
          ${currentPage === `#${item.link}` ? 'underline' : ''}
        `}
      >{item.title.toUpperCase()}</Button>
    </Link>
  );

  return (
    <nav className="flex flex-row flex-grow lg:flex-4 sm:flex-1 flex-wrap justify-between items-center gap-2">
      {
        menuItems.map((item, i) => !item.conditional 
          ? defaultLinkElement(item, i) :
          (item.conditional.authenticated && token) && defaultLinkElement(item, i) ||
          (!item.conditional.authenticated && !token) && defaultLinkElement(item, i)
        )
      }   
      <Button icon={iconMap["main-menu-theme"]} status="options" className="..." onClick={handleThemeChange}>
        TEMA ({theme ? "ESCURO" : "CLARO"})
      </Button>
    </nav>
  );
}