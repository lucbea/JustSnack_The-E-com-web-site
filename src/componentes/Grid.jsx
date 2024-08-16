import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Tarjeta } from './Tarjeta';
import TarjetaLiked from './TarjetaLiked';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function Grilla({ products }) {
  return (
    <Box sx={{ flexGrow: 1, diplay:'flex', justifyContent:'center' }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 3, lg:3}} sx={{maxWidth:'900px'}} >
        {products.map (product  => (
          <Grid sx={{display:'flex', justifyContent:'center',}} xs={10} sm={1} md={1} key={ product.id}>
            <TarjetaLiked product={ product } />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}