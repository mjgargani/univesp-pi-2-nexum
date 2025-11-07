import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../../hooks/useMainContext";

export default function Logout() {
  const { token, logout } = useMainContext();

  const navigate = useNavigate();
  
  useEffect(() => {
    if(token) {
      logout();
    } else if(!token) {
      navigate('/');
    }
  }, [token, logout, navigate]);

	return <div> Deslogando... </div>;
}
