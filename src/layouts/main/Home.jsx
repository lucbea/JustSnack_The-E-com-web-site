import { useState, useEffect, useContext } from 'react';
import Grilla from './Grid';
import { Splide, SplideSlide } from '@splidejs/react-splide';
// import Slider from './componentes/Slider'; // Asume que tienes un componente Slider
import { Box } from '@mui/material';
import { OrdenShopContext } from '../../context/OrdenShop';
import { PiFolderSimpleMinusDuotone } from 'react-icons/pi';
import { SlideInfinit } from '../../componentes/SlideInfinitInicio';
import '@splidejs/react-splide/css';
import { MarqueeInicio } from '../../componentes/MarqueInicio';


export const Home = ({ products }) => {

  const { ordenCarro, setOrdenCarro, showProducts, setShowProducts, totalCarro, setAgregarCarro } = useContext(OrdenShopContext);
  setShowProducts(true);
  return (
    <Box>

      <Box sx={{ position: 'relative', marginBottom:'30px', height:'auto',  }}>
        {/* <Box sx={{ height: '40px', marginBottom: '10px', position: 'absolute', top: '90px', zIndex: '4', textAlign: 'center', width: '80%', display: 'flex', justifyContent: 'center', clamp:'(12px, 2vw, 24px)' }}>
          <h2 style={{ fontSize: '200%', backgroundColor: 'red', textAlign: 'center', textShadow: '1px 1px 1px black' }}>Justo para vos... Snack natural</h2>

        </Box> */}
        <Box >
          <SlideInfinit />
        </Box>
      </Box>
      <Box>
      {showProducts ? (
        <Grilla products={products} />
      ) : (null)}
</Box>
    </Box>
  );
}
