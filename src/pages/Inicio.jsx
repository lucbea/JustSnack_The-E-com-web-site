import { useContext, useEffect } from 'react';
import { DataBDContext } from '../context/DataBd';
import {Home} from '../layouts/main/Home'

export const Inicio = () => {
    const { products } = useContext(DataBDContext);
    useEffect(() => {
        localStorage.setItem('404', JSON.stringify(false));
      }, []);
    return (
        <Home products={products}/>
    )
}