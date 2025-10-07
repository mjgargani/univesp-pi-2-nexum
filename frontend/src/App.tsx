import { useTitle } from './hooks/useTitle';
import { HashRouter } from 'react-router-dom';

import Container from './components/templates/Container';

import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
  const title = import.meta.env.VITE_COMPANY_NAME ? `Nexum: ${import.meta.env.VITE_COMPANY_NAME}` : 'Nexum: Mecânica SHALLON';
  useTitle(title);

  const [get, set] = useLocalStorage();

  return (
    <HashRouter>
      <div className="dark:bg-[var(--bg)]">
        <main className="">
          <Container landing={location.hash === '#/' || location.hash === ''} />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
