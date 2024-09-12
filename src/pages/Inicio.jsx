import { useContext } from 'react';
import { DataBDContext } from '../context/DataBd';
import {Home} from '../layouts/main/Home'
import '@splidejs/react-splide/css';

export const Inicio = () => {
    const { products } = useContext(DataBDContext);
    return (
        <Home products={products}/>
        // <h1>ESTE EyS HOME</h1>
    )
}