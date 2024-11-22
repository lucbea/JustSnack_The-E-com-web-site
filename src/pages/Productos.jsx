
import { Box } from "@mui/material";
import Grilla from "../layouts/main/Grid";
import { useContext } from "react";
import { DataBDContext } from "../context/DataBd";

import spinner from "../assets/bx_loader.gif";
import { ThemeCustom } from "../context/ThemeCustom";
import { StyleSpinner } from "../hook/StyleSpinner";

export const Productos = () => {
  const theme = ThemeCustom();
  const stSpinner = StyleSpinner({ theme });
  const { products, loadingProducts } = useContext(DataBDContext);

 
  if (loadingProducts) {
    return <Box sx={{ ...stSpinner.boxMesagge }}>Cargando...
            <Box sx={{ ...stSpinner.contentSpinner }}>
                <img src={spinner} alt="Loading spinner"
                    style={{ ...stSpinner.imgSpinner }} />
            </Box>
        </Box>;
}
  return (
    <Box sx={{ marginBottom: '100px' }}>
      <Grilla products={products} />
    </Box>
  )
}