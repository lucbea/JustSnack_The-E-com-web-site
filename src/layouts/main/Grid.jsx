
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Tarjeta } from '../../componentes/Tarjeta';
import TarjetaLiked from '../../componentes/TarjetaLiked';


export default function Grilla({ products }) {

  // console.log("grid.", products);

  if (!Array.isArray(products)) {
    // console.error("Expected 'products' to be an array but got:", products);
    return <div></div>; // O cualquier otra UI para manejar el caso
  }


  return (
    <Box sx={{ flexGrow: 1, diplay:'flex', justifyContent:'center' }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 3, lg:4}} sx={{maxWidth:'1300px'}} >
        {products.map (product  => (
          <Grid sx={{display:'flex', justifyContent:'center',}} xs={10} sm={1} md={1} key={ product.id}>
            <TarjetaLiked product={ product } />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}