
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TarjetaLiked from './TarjetaLiked';

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