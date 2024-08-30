import { useState, useEffect, useContext } from 'react';
// import { useFetchGet } from './hook/FetchGet';
import Grilla from './Grid';
// import Slider from './componentes/Slider'; // Asume que tienes un componente Slider
import { Box } from '@mui/material';
import { OrdenShopContext } from '../../context/OrdenShop';

export  const Home = ({products}) => {
    
  const { ordenCarro, setOrdenCarro, showProducts, setShowProducts, totalCarro, setAgregarCarro } = useContext(OrdenShopContext);
 
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const URLBase = "https://dummyjson.com/products";
//   const [URL, setURL] = useState(URLBase);

//   useFetchGet({ URL, setProducts, setPagTotal: () => {}, isLoading, setIsLoading });

//   useEffect(() => {
    // if (!isLoading) {
      // Aquí podrías realizar cualquier acción adicional después de que los productos se hayan cargado
    // }
//   }, [isLoading]);

  return (
    <div>
      <h1>Bienvenidos</h1>
      {/* <Slider /> */}
      {showProducts? (
        <Grilla products={products} />
      ) : (null)}
    </div>
  );
}
