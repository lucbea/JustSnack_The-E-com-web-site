
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tarjeta from '../../componentes/Tarjeta';
import { OrdenShopContext } from '../../context/OrdenShop';
import { ThemeCustom } from '../../context/ThemeCustom';


export default function Grilla({ products }) {
  const theme = ThemeCustom();
  const { notFoundSearch } = useContext(OrdenShopContext)

  return (
    <Box sx={{marginInline:'auto', display:'flex', justifyContent:'center'}}>

    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      maxWidth:'1100px',
     
    }}>
      {!notFoundSearch ? (
        <Grid container spacing={{ xs: 2, md: 2 }} 
        columns={{ xs: 1, sm: 2, md: products.length > 2 ? 3 : 2 }} 
          sx={{
            maxWidth: '1300px',
            justifyContent: 'center',
          }} >
          {products.map(product => (
            <Grid sx={{
              display: 'flex',
              justifyContent: 'center',
              width:'auto',            
            }}
              xs={10} sm={1} md={1} key={product.id}>
              <Tarjeta product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box 
        sx={{
          minHeight:'20vh',
          display: 'flex',
          alignItems:'center',
        }} >
          <Box sx={{
                padding: '20px',
                paddingBottom:'35px',
                borderRadius: '5px',
                backgroundColor: theme.palette.primary.backFiltro,
                boxShadow:theme.palette.primary.sombraBox,
          }}>
          <p style={{
            color: theme.palette.primary.rojo,
            fontWeight:900,
            fontSize:'25px',
          }}>No hay productos para mostrar.</p> 
          <p>Modifique el filtro y/o las palabras de búsqueda.</p>
          </Box>          
        </Box>
      )}
    </Box>
    </Box>
  );
}