import { useEffect } from "react";
import { useMainContext } from "../../hooks/useMainContext";
import Button from "../atoms/Button";
import { RecursiveView } from "../molecules/View";
import { useNavigate } from "react-router-dom";
import type { AlertProps } from "../../types";

export default function Management() {
  const { getNavigation, userNavigation, getUserView, userView, loading, token, handleAlert } = useMainContext();

  const navigate = useNavigate()

  useEffect(() => {
    if(token &&!loading){
      if(!userNavigation) {
        getNavigation();
      }
      if(!userView) {
        getUserView('/users/profile');
      }
    } else if (!token){
      const newAlert: AlertProps = {
        show: true,
        type: 'error',
        message: 'Token de autenticação indisponível ou sessão expirada, realize o login novamente.'
      };
      handleAlert(newAlert);
      navigate('/login');
    }
  }, [token, loading, userNavigation, getNavigation, userView, getUserView, navigate, handleAlert]);

  return (<>
    {loading && (
      <div>Carregando informações...</div>
    )}
    {!loading && userNavigation && (
      <div className="container flex w-full flex-row flex-grow gap-8">
        <div className="bg-[var(--fg)] rounded-lg gap-8 p-4 flex-1">
          {userNavigation?.map((item, i) => (<Button key={i} className="w-full">{item.label}</Button>))}
        </div>
        <div className="bg-[var(--fg)] rounded-lg gap-8 p-4 flex-4">
          {userView && <RecursiveView data={userView} />}
        </div>
      </div>
    )}
    {!loading && !userNavigation && (
      <div>Não foi possível carregar o perfil.</div>
    )}
  </>);
}
