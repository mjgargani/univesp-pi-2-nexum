import { useState } from 'react';
import CustomerList from './components/CustomerList';
import ServiceList from './components/ServiceList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'customers' | 'services'>('customers');

  return (
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
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label="View customers"
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label="View mechanical services"
          >
            Mechanical Services
          </button>
        </nav>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'customers' && <CustomerList />}
          {activeTab === 'services' && <ServiceList />}
        </div>
      </main>
    </div>
  );
}

export default App;
