import { useEffect } from 'react';
import SignIn from "../layouts/main/SignIn";


export const IniciarSesion = () => {
  useEffect(() => {
    localStorage.setItem('404', JSON.stringify(false));
  }, []);

  return (
    <SignIn />
  )
}
