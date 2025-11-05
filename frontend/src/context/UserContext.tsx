export function UserContextProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = () = {};
  const logout = () => {};
  // (WIP) const register = () => {}; 

  const getMenuOptions = () => {}


}