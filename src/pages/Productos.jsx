
import { Box } from "@mui/material";
import Grilla from "../layouts/main/Grid";
import { Filtros } from "../componentes/Filtros";
import { useContext } from "react";
import { DataBDContext } from "../context/DataBd";

export const Productos = () => {
  const { products } = useContext(DataBDContext)
  return (
    <Box sx={{ marginBottom: '100px' }}>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Filtros/>
       
      </Box>
      <Grilla products={products} />
    </Box>
  )
}