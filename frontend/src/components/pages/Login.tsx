import { useEffect, useState } from "react";
import { ApiService } from "../../services/api";
import Form from "../molecules/Form";

export default function Login() {
  const [loginForm, setLoginForm] = useState<null | object>(null);
  useEffect(() => {
    ApiService.get('/auth/form').then(data => {
      setLoginForm(data);
    }).catch(error => {
      console.error('Error fetching login form:', error);
    });
  }, []);
	return (<div>
    {loginForm && <Form formData={loginForm} />}
  </div>);
}
