import { useCallback, useEffect, useState } from "react";
import { type LoginRequest, type LoginResponse, type MenuResponse, type ProfileResponse } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ApiService } from "../services/api";
import { MainContext } from "./contexts";

// O contexto acessa a API e salva no localStorage as informações pertientes ao usuário
export function MainContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean | null>(true);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [userMenu, setUserMenu] = useState<MenuResponse | null>(null);

  const localStorage = useLocalStorage();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === true);
    root.classList.toggle('light', theme === false);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme', null);
    const storedToken = localStorage.getItem('access_token', null);
    const storedProfile = localStorage.getItem('profile', null);
    setTheme(storedTheme === 'dark');
    setToken(storedToken);
    setProfile(storedProfile ? JSON.parse(storedProfile) : null);
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
    localStorage.removeItem('profile');
    setToken(null);
    setProfile(null);
  }, [localStorage]);

  // Acessa o perfil
  const getProfile = useCallback(async () => {
    setLoading(true);
    return ApiService.get<ProfileResponse>('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setProfile(response);
    }).catch(()=>{
      console.error('Falha ao obter o perfil do usuário.');
    }).finally(() => {
      setLoading(false);
    });
  }, [token]);

  // Acessa o perfil
  const getUserMenu = useCallback(async () => {
    setLoading(true);
    return ApiService.get<MenuResponse>('/users/menu', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setUserMenu(response);
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
      profile,
      setProfile,
      userMenu,
      setUserMenu,
      login,
      logout,
      getProfile,
      getUserMenu
    }
  }>
    {children}
  </MainContext.Provider>;
}