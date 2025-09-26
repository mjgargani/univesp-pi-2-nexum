import { useTitle } from './hooks/useTitle';
import { HashRouter } from 'react-router-dom';

import Container from './components/templates/Container';

import './App.css';


function App() {
  const title = import.meta.env.VITE_COMPANY_NAME ? `Nexum: ${import.meta.env.VITE_COMPANY_NAME}` : 'Nexum: Mecânica SHALLON';
  useTitle(title);
  return (
    <HashRouter>
      <div className="">
        <main className="">
          <Container landing={location.hash === '#/' || location.hash === ''} />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
