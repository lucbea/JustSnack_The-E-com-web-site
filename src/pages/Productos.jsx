
import { Box } from "@mui/material";
import Grid from "../layouts/main/Grid";
import { Filtros } from "../componentes/Filtros";

export const Productos = ({ products }) => {
  return (
    <Box sx={{ marginBottom: '100px' }}>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Filtros/>
       
      </Box>
      <Grid products={products} />
    </Box>
  )
}