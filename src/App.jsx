
import { useState } from 'react'
import { ThemeProvider, styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Grilla from './componentes/Grid';
import { useFetchGet } from './componentes/FetchGet';

import spinner from "../images/bx_loader.gif";
import { ThemeCustom } from "./context/ThemeCustom"
import './App.css'
import { HearthEfect } from './componentes/HearthEfect';
import NavAppBar from './layouts/header/NavAppBar';
import { OrdenShopProvider } from './context/OrdenShop';


function App() {

  const [products, setProducts] = useState([]);
  const [pag, setPag] = useState(1);
  const [pagTotal, setPagTotal] = useState(1);
  const URLBase = "https://dummyjson.com/products"
  const [URL, setURL] = useState(URLBase)
  const [isLoading, setIsLoading] = useState(true);

  const dataProd = useFetchGet({ URL, setProducts, pag, setPagTotal, isLoading, setIsLoading })
  const theme = ThemeCustom();
  document.body.style.backgroundColor = theme.palette.primary.main;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OrdenShopProvider>
          <NavAppBar />
          <HearthEfect />
          <main style={{ paddingTop: '60px' }}>
            {isLoading ? (
              <Box sx={{ height: '40px' }}>
                <img style={{ height: '40px' }} src={spinner} alt="spinner" />
              </Box>
            ) : (
              <Box>
                <Grilla products={products} />
              </Box>
            )}
          </main>
        </OrdenShopProvider>
      </ThemeProvider>
    </>
  )
}
export default App