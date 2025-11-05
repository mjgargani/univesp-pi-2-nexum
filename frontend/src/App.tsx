import { useTitle } from './hooks/useTitle';
import { HashRouter } from 'react-router-dom';

import Container from './components/templates/Container';

import './App.css';


function App() {
  const title = import.meta.env.VITE_COMPANY_NAME ? `Nexum: ${import.meta.env.VITE_COMPANY_NAME}` : 'Nexum';
  useTitle(title);
  
  return (
    <HashRouter>
      <Container />
    </HashRouter>
  );
}

export default App;
