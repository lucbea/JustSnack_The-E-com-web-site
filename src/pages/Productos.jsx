
import { Box } from "@mui/material";
import Grid from "../layouts/main/Grid";

export const Productos = ({ products }) => {
  return (
    <Box sx={{ marginBottom: '100px' }}>
      <Grid products={products} />
    </Box>
  )
}