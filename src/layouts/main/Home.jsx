import { useContext } from 'react';
import Grilla from './Grid';
// import Slider from './componentes/Slider'; // Asume que tienes un componente Slider
import { Box } from '@mui/material';
import { OrdenShopContext } from '../../context/OrdenShop';
import { SlideInfinit } from '../../componentes/SlideInfinitInicio';
import '@splidejs/react-splide/css';
import { Filtros } from '../../componentes/Filtros';


export const Home = ({ products }) => {

  // const { ordenCarro, setOrdenCarro, showProducts, setShowProducts, totalCarro, setAgregarCarro } = useContext(OrdenShopContext);
  // setShowProducts(true);
  return (
    <Box>
      <Box sx={{ position: 'relative', marginBottom:'30px', height:'auto',  }}>
        {/* <Box > */}
          <SlideInfinit />
        {/* </Box> */}
      </Box>
      <Filtros/>
      <Box>
      {/* {showProducts ? ( */}
        <Grilla products={products} />
      {/* ) : (null)} */}
</Box>
    </Box>
  );
}
