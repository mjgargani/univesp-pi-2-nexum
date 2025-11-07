import { useEffect } from "react";
import { useMainContext } from "../../hooks/useMainContext";

export default function Management() {
  const { getUserMenu, userMenu, loading, token } = useMainContext();

  useEffect(() => {
    if(token &&!loading && !userMenu){
      getUserMenu();
    }
  }, [token, loading, userMenu, getUserMenu]);

  return (<>
    {loading && (
      <div>Carregando informações...</div>
    )}
    {!loading && userMenu && (
      <div className="container flex w-full flex-row flex-grow gap-8">
        <div className="bg-[var(--fg)] rounded-lg gap-8 p-4 flex-1">
          {userMenu?.map((item, i) => (<p key={i}>{item.label}</p>))}
        </div>
        <div className="bg-[var(--fg)] rounded-lg gap-8 p-4 flex-4">
          <p>Forms</p>
        </div>
      </div>
    )}
    {!loading && !userMenu && (
      <div>Não foi possível carregar o perfil.</div>
    )}
  </>);
}
