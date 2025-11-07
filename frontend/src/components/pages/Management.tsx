import { useEffect } from "react";
import { useMainContext } from "../../hooks/useMainContext";
import Button from "../atoms/Button";
import { View } from "../molecules/View";

export default function Management() {
  const { getNavigation, userNavigation, getUserView, userView, loading, token } = useMainContext();

  useEffect(() => {
    if(token &&!loading){
      if(!userNavigation) {
        getNavigation();
      }
      if(!userView) {
        getUserView('/users/profile');
      }
    }
  }, [token, loading, userNavigation, getNavigation, userView, getUserView]);

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
          {userView && <View data={userView} />}
        </div>
      </div>
    )}
    {!loading && !userNavigation && (
      <div>Não foi possível carregar o perfil.</div>
    )}
  </>);
}
