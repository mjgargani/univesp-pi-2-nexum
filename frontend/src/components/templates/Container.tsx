
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Logo from "../atoms/Logo";
import { useEffect } from "react";
import Management from "../pages/Management";
import { useMainContext } from "../../hooks/useMainContext";
import Logout from "../pages/Logout";
import { Alert } from "../atoms/Alert";
import type { AlertProps } from "../../types";
import { MainMenu } from "../molecules/MainMenu";


export default function Container({ className }: { className?: string }) {
  const { handleAlert } = useMainContext();

  useEffect(() => {
    const newAlert: AlertProps = {
      show: true,
      type: 'warn',
      message: 'Esta é uma aplicação de demonstração desenvolvida para fins acadêmicos. Todos os dados apresentados são fictícios e não representam informações reais de usuários ou entidades.'
    };
    handleAlert(newAlert);
  }, [handleAlert])
  
  return (<div className={`flex flex-col min-h-screen bg-[var(--bg)] gap-8 ${className}`}>
    <Alert />
    <header className="bg-[var(--fg)] flex flex-row flex-wrap items-center rounded-b-lg w-full p-2">
      <div className="flex flex-row flex-wrap items-center container max-w-7xl mx-auto gap-4">
        <Logo className="flex lg:flex-1 sm:flex-5" />
        <MainMenu />
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
