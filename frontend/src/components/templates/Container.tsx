
import { Link, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import CustomerList from "../pages/CustomerList";
import ServiceList from "../pages/ServiceList";
import Button from '../atoms/Button';
import Logo from "../atoms/Logo";
import { useEffect, useState } from "react";
import type { Theme } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";


export default function Container({ className='', landing=true, manage=false }: { className?: string, landing?: boolean, manage?: boolean }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const localStorage = useLocalStorage();

  useEffect(() => {
    const theme = localStorage.getItem('theme', 'dark') as Theme;
    setTheme(theme ?? 'dark');
  }, [localStorage])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  }, [theme])

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
  }

	return (<div className={`flex flex-col min-h-screen bg-[var(--bg)] gap-8 ${className}`}>
    <header className="bg-[var(--fg)] flex flex-row items-center rounded-b-lg w-full p-2">
      <div className="flex flex-row items-center container max-w-7xl mx-auto">
        <Logo className="flex flex-1"/>
        <nav className="flex flex-row flex-4 justify-between items-center mr-8">
        {landing ? (
          <>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--brand]" aria-label="Ver Página Inicial">HOME</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--brand]" aria-label="Ver Página 'Quem Somos'">QUEM SOMOS</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--brand]" aria-label="Ver Página 'Serviços'">SERVIÇOS</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--brand]" aria-label="Ver Página 'Contato'">CONTATO</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--brand]">{manage ? 'GERENCIAR' : 'LOGIN'}</Button>
            <Button status="options" onClick={() => handleSetTheme(theme === 'dark' ? 'light' : 'dark')}>TEMA ({theme === "dark" ? "ESCURO" : "CLARO"})</Button>
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
    <main className="flex-1 items-center container max-w-7xl mx-auto px-4">
      {landing ? (
        <Landing />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/services" element={<ServiceList />} />
        </Routes>
      )}
    </main>
    <footer className="bg-[var(--fg)] rounded-t-lg">
      <div className="flex flex-row items-center justify-center gap-4 container max-w-7xl mx-auto p-2">
        <p className="text-center">🄯 Copyleft: Nexum (<a href="https://github.com/mjgargani/univesp-pi-2-nexum/blob/main/LICENSE" target="_blank" rel="noreferrer" className="flex-1 text-center hover:underline" aria-label="Ver licença do projeto">Licença MIT</a>)</p> 
        <div className="">
          <a
            href="https://github.com/mjgargani/univesp-pi-2-nexum/releases"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.shields.io/github/v/tag/mjgargani/univesp-pi-2-nexum"
              alt="Latest release"
            />
          </a>
			  </div>
      </div>
    </footer>
  </div>);
}
