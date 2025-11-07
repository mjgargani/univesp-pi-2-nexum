import { useCallback, useEffect, useState } from "react";
import { type LoginRequest, type LoginResponse, type UserNavigationResponse, type UserViewResponse } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ApiService } from "../services/api";
import { MainContext } from "./contexts";

// O contexto acessa a API e salva no localStorage as informações pertientes ao usuário
export function MainContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean | null>(true);
  const [token, setToken] = useState<string | null>(null);
  const [userNavigation, setUserNavigation] = useState<UserNavigationResponse | null>(null);
  const [userView, setUserView] = useState<UserViewResponse | null>(null);

  const localStorage = useLocalStorage();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === true);
    root.classList.toggle('light', theme === false);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme', null);
    const storedToken = localStorage.getItem('access_token', null);
    setTheme(storedTheme === 'dark');
    setToken(storedToken);
  }, [localStorage]);

  const handleThemeChange = useCallback(() => {
    const newTheme = theme ? false : true;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setTheme(newTheme);
  }, [theme, localStorage]);

  const handleTokenChange = useCallback((newToken: string | null) => {
    if(!newToken) {
      localStorage.removeItem('access_token');
      setToken(null);
    }
    localStorage.setItem('access_token', newToken!);
    setToken(localStorage.getItem('access_token'));
  }, [localStorage]);

  // Acessa o perfil com as credenciais do usuário (userName e password)
  const login = useCallback(async ({ userName, password }: LoginRequest) => {
    setLoading(true);
    return ApiService.post<LoginRequest, LoginResponse>('/auth/login', {
        userName,
        password
    }).then(response => {
      handleTokenChange(response.access_token);
    }).catch(()=>{
      console.error('Falha ao realizar login com as credenciais fornecidas.');
    }).finally(() => {
      setLoading(false);
    });
  }, [handleTokenChange]);

  // Limpa as credenciais do usuário e o perfil
  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUserNavigation(null);
    setUserView(null);
  }, [localStorage]);

  // Acessa uma userView específica
  const getUserView = useCallback(async (endPoint: string) => {
  if (!token) {
    console.error('Tentando buscar view sem token. Abortando.');
    return;
  }
  setLoading(true);
  
  try {
    const response = await ApiService.get<UserViewResponse>(endPoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setUserView(response); 
  } catch (error) {
    console.error('Falha ao obter o perfil do usuário.', error);
    setUserView(null);
  } finally {
    setLoading(false);
  }
}, [token]);

  // Acessa o perfil
  const getNavigation = useCallback(async () => {
    setLoading(true);
    return ApiService.get<UserNavigationResponse>('/users/menu', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setUserNavigation(response);
    }).catch(()=>{
      console.error('Falha ao obter o menu do usuário.');
    }).finally(() => {
      setLoading(false);
    });
  }, [token]);

  return <MainContext.Provider value={
    {
      loading,
      setLoading,
      theme,
      handleThemeChange,
      token,
      setToken,
      userView,
      setUserView,
      userNavigation,
      setUserNavigation,
      login,
      logout,
      getUserView,
      getNavigation
    }
  }>
    {children}
  </MainContext.Provider>;
}