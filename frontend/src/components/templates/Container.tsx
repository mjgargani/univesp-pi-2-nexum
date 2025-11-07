
import { Link, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Button from '../atoms/Button';
import Logo from "../atoms/Logo";
import { useState } from "react";
import Management from "../pages/Management";
import { useMainContext } from "../../hooks/useMainContext";
import Logout from "../pages/Logout";


export default function Container({ className }: { className?: string }) {
  const [currentPage, ] = useState<string>(window.location.hash);

  const { token, theme, handleThemeChange } = useMainContext();
  
  return (<div className={`flex flex-col min-h-screen bg-[var(--bg)] gap-8 ${className}`}>
    <header className="bg-[var(--fg)] flex flex-row flex-wrap items-center rounded-b-lg w-full p-2">
      <div className="flex flex-row flex-wrap items-center container max-w-7xl mx-auto gap-4">
        <Logo className="flex lg:flex-1 sm:flex-5"/>
        <nav className="flex flex-row flex-grow lg:flex-4 sm:flex-1 flex-wrap justify-between items-center gap-2">
          <>
            <Link to="/" aria-label="Ver Página 'Início'">
              <Button className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow">{currentPage === '#/' || currentPage === '' ? 'INÍCIO' : 'VOLTAR PARA INÍCIO'}</Button>
            </Link>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow" aria-label="Ver Página Inicial">HOME</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow" aria-label="Ver Página 'Quem Somos'">QUEM SOMOS</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow" aria-label="Ver Página 'Serviços'">SERVIÇOS</Button>
            <Button status="disabled" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow" aria-label="Ver Página 'Contato'">CONTATO</Button>
            <Link to={token ? '/logout' : '/login'} aria-label="Fazer Login">
              <Button className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow">{token ? 'LOGOUT' : 'LOGIN'}</Button>
            </Link> 
            <Button status="options" className="bg-[var(--brand)] text-[var(--text)] font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[var(--highlight)] sm:flex-grow" onClick={
              // https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/Guides/Mobile_accessibility_checklist#:~:text=Cor%20*%20O%20constrate%20de%20cor%20DEVE,outros%20meios%20(textos%20sublinhados%20para%20links%2C%20etc.)
              () => handleThemeChange()}>TEMA ({theme ? "ESCURO" : "CLARO"}
            )</Button>
          </>
        </nav>
      </div>
    </header>
    <main className="flex-1 items-center container max-w-7xl mx-auto px-4">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </main>
    <footer className="bg-[var(--fg)] rounded-t-lg">
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 container max-w-7xl mx-auto p-2">
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
