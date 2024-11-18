import { useEffect } from 'react';
import SignUp from "../layouts/main/SignUp";


export const Registrarse = () => {

  useEffect(() => {
    localStorage.setItem('404', JSON.stringify(false));
  }, []);

  return (
    <SignUp/>
  )
}