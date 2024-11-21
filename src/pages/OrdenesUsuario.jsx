import { useEffect } from 'react';
import {UserOrders} from "../layouts/main/UserOrders";

export const OrdenesUsuario = () => {

  useEffect(() => {
    localStorage.setItem('404', JSON.stringify(false));
  }, []);
  
  return (
    <UserOrders/>
  )
}