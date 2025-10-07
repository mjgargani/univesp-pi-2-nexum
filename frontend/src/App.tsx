import { useTitle } from './hooks/useTitle';
import { HashRouter } from 'react-router-dom';

import Container from './components/templates/Container';

import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useEffect, useState } from 'react';


function App() {
  const title = import.meta.env.VITE_COMPANY_NAME ? `Nexum: ${import.meta.env.VITE_COMPANY_NAME}` : 'Nexum: Mecânica SHALLON';
  useTitle(title);
  const [theme, setTheme] = useState<string>('dark');

  const localStorage = useLocalStorage();

  useEffect(() => {
    localStorage.getItem('theme', 'dark');
    setTheme(localStorage.getItem('theme', 'dark') ?? 'dark');
  }, [localStorage])

  return (
    <HashRouter>
      <div className={`${theme} bg-[var(--bg)] min-h-screen flex flex-col`}>
        <main className="">
          <Container landing={location.hash === '#/' || location.hash === ''} />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
