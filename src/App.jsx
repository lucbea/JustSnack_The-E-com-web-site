
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, Link } from '@mui/material';
import ContentTarjNavScrollFix from './componentes/ContenTarjNavScrollFix';
import Paginacion from './componentes/Paginacion';
import Grilla from './layouts/Grid';
import { useFetchGet } from './componentes/FetchGet';
import { Filtro } from './componentes/Filtro';

import spinner from "../images/bx_loader.gif";
import { HiBars3 } from "react-icons/hi2";
import SignIn from './layouts/SignIn';
import { ThemeCustom } from "./context/ThemeCustom";
import { OrdenShopProvider } from './context/OrdenShop';
import { UserProvider } from './context/Users';
import './App.css'
// import { Nav } from './layouts/header/Nav';
import { HearthEfect } from './componentes/HearthEfect';
import NavAppBar from './layouts/header/NavAppBar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IniciarSesion }  from './pages/IniciarSesion';
import { Registrarse } from './pages/Registrarse';
import  Ckeckout  from './layouts/finalCompra/Checkout'
import { Home } from './pages/Home';


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
          <UserProvider>
          <OrdenShopProvider>
            <NavAppBar />
            <HearthEfect />
            <main style={{ paddingTop: '60px' }}>
              <Routes>
                <Route path="/" element={  <Home/> } />  
                <Route path="/products" element={ <Grilla products={products}/> } />
                <Route path="/signIn" element={  <IniciarSesion/> } />                
                <Route path="/signUp" element={  <Registrarse/> } />
                <Route path="/products" element={ <Grilla products={products}/> } />
                <Route path="/product:id " element={  <Registrarse/> } />
                {/* <Route path="*" element={NotFound}/> */}
                </Routes> 



              {/* {isLoading ? (
                <Box sx={{ height: '40px' }}>
                  <img style={{ height: '40px' }} src={spinner} alt="spinner" />
                </Box>
              ) : (
                <Box>
                  <Grilla products={products} />
                </Box>
              )}
             
              {/* <Ckeckout/> */}
              <Home/>
            </main>

          </OrdenShopProvider>
          </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default App