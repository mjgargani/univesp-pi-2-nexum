import { useEffect, useState } from "react";
import { ApiService } from "../../services/api";
import Form from "../molecules/Form";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Login() {
  const [loginForm, setLoginForm] = useState<null | object>(null);
  const [loginData, setLoginData] = useState<null | object>(null);
  const [profileData, setProfileData] = useState<null | object>(null);

  const localStorage = useLocalStorage();
  
  useEffect(() => {
    ApiService.get('/auth/form').then(data => {
      setLoginForm(data);
    }).catch(error => {
      console.error('Error fetching login form:', error);
    });
  }, []);

  useEffect(() => {
    if (loginData && 'access_token' in loginData) {
      localStorage.setItem('access_token', (loginData as any).access_token);   
    }
    const token = localStorage.getItem('access_token');

    if (token) {
      ApiService.get('/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(data => {
        setProfileData(data);
      }).catch(error => {
        console.error('Error fetching profile data:', error);
      });
    }
  }, [loginData, localStorage])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    await ApiService.post('/auth/login', data).then(response => {
      setLoginData(response);
    }).catch(error => {
      console.error('Error during login:', error);
    });
  }

	return (<div>
    {(loginForm && !loginData) && <Form formData={loginForm} onSubmit={handleSubmit}/>}
    {(profileData) && <div className="text-[var(--text)]">{JSON.stringify(profileData)}</div>}
  </div>);
}
