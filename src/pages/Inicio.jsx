import { useContext } from 'react';
import { DataBDContext } from '../context/DataBd';
import {Home} from '../layouts/main/Home'

export const Inicio = () => {
    const { products } = useContext(DataBDContext);
    
    return (
        <Home products={products}/>
    )
}