import { useTitle } from './hooks/useTitle';

import { HashRouter } from 'react-router-dom';
import './App.css';
import Container from './components/templates/Container';


function App() {
  useTitle('Nexum: Mecânica SHALLON');
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Container landing={location.hash === '#/' || location.hash === ''} />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
