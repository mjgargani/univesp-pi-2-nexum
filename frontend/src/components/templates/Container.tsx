
import { Link, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import CustomerList from "../pages/CustomerList";
import ServiceList from "../pages/ServiceList";
import Button from '../atoms/Button';
import Logo from "../atoms/Logo";


export default function Container({ landing = true, manage = false }: { landing?: boolean, manage?: boolean }) {
	return (<div className="flex flex-col">
    <header className="flex justify-center bg-[#40576e] p-[8px] rounded-b-[16px]">
      <div className="flex flex-row flex-grow max-w-[800px]">
        <Logo className="max-w-[150px]"/>
        <nav className="flex flex-row gap-x-[8px] flex-grow justify-between ml-[32px] max-h-[32px] mt-[16px]">
        {landing ? (
          <>
            <Button status="options" className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]" aria-label="Ver Página Inicial">HOME</Button>
            <Button status="options" className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]" aria-label="Ver Página 'Quem Somos'">QUEM SOMOS</Button>
            <Button status="options" className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]" aria-label="Ver Página 'Serviços'">SERVIÇOS</Button>
            <Button status="options" className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]" aria-label="Ver Página 'Contato'">CONTATO</Button>
            <Button status="options" className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]">{manage ? 'GERENCIAR' : 'LOGIN'}</Button>
          </>
        ) : (
          <>
            <Link to="/customers" aria-label="Ver Clientes">
              <Button status="options">CLIENTES</Button>
            </Link>
            <Link to="/services" aria-label="Ver Serviços">
              <Button status="options">SERVIÇOS</Button>
            </Link>
          </>)}
        </nav>
      </div>
    </header>
    <div className="">
      {landing ? (
        <Landing />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/services" element={<ServiceList />} />
        </Routes>
      )}
    </div>
  </div>);
}
