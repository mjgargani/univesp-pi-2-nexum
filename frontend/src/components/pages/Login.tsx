import { useEffect, useState } from "react";
import { ApiService } from "../../services/api";
import Form from "../molecules/Form";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../../hooks/useMainContext";
import type { HypermediaForm } from "../../types";

export default function Login() {
  const [loginForm, setLoginForm] = useState<HypermediaForm | null>(null);
  const [loginData, ] = useState<null | object>(null);

  const { login, token, loading } = useMainContext();

  const navigate = useNavigate();
  
  useEffect(() => {
    ApiService.get<HypermediaForm>('/auth/form').then(data => {
      setLoginForm(data);
    }).catch(error => {
      console.error('Error fetching login form:', error);
    });
  }, []);

  useEffect(() => {
    if(navigate && token) {
      navigate('/management');
    }
  }, [token, navigate]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await login({ userName: data.userName as string, password: data.password as string });
  }

	return (<div>
    {(loginForm && !loginData && !loading) && <Form formData={loginForm} onSubmit={handleSubmit}/>}
  </div>);
}
