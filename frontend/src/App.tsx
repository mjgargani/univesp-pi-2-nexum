import { useTitle } from './hooks/useTitle';

import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import CustomerList from './components/pages/CustomerList';
import ServiceList from './components/pages/ServiceList';
import './App.css';


function App() {
  useTitle('Nexum: Mecânica SHALLON');
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold">Nexum</h1>
              <p className="text-blue-100">Customer Service & Mechanical Services Management</p>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex space-x-8 mb-8">
            <Link
              to="/customers"
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                location.hash === '#/customers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="View customers"
            >
              Customers
            </Link>
            <Link
              to="/services"
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                location.hash === '#/services'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="View mechanical services"
            >
              Mechanical Services
            </Link>
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                location.hash === '#/'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="Landing"
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                location.hash === '#/login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="Login"
            >
              Login
            </Link>
          </nav>
          <div className="bg-white rounded-lg shadow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/services" element={<ServiceList />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
