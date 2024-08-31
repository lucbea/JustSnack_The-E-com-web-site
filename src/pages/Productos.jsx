
import { Box } from "@mui/material";
import Grid from "../layouts/main/Grid";
import { FiltroCateg } from "../componentes/FiltroCateg";

export const Productos = ({ products }) => {
  return (
    <Box sx={{ marginBottom: '100px' }}>
      <Box>
        <FiltroCateg/>
      </Box>
      <Grid products={products} />
    </Box>
  )
}