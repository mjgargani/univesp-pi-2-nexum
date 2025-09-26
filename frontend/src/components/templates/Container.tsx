
import { Link, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import CustomerList from "../pages/CustomerList";
import ServiceList from "../pages/ServiceList";
import Button from '../atoms/Button';


export default function Container({ landing = true }: { landing?: boolean }) {
	return (<div>
    {landing ? (
      <Landing />
    ) : (
      <div>
        <nav className="flex space-x-8 mb-8">
          <Link to="/customers" aria-label="View customers">
            <Button status={location.hash === '#/customers' ? 'options' : 'default'}>Customers</Button>
          </Link>
          <Link to="/services" aria-label="View mechanical services">
            <Button status={location.hash === '#/services' ? 'options' : 'default'}>Mechanical Services</Button>
          </Link>
          <Link to="/login" aria-label={landing ? 'Login' : 'Gerenciar'}>
            <Button status={location.hash === '#/login' ? 'options' : 'default'}>
              {landing ? 'LOGIN' : 'GERENCIAR'}
            </Button>
          </Link>
        </nav>
        <div className="bg-white rounded-lg shadow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/services" element={<ServiceList />} />
          </Routes>
        </div>
      </div>
    )}
    
  </div>);
}
