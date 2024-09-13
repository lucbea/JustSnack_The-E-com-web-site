
//App.jsx
import { useState, useContext } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, Link } from '@mui/material';
// import ContentTarjNavScrollFix from './componentes/ContenTarjNavScrollFix';
// import Paginacion from './componentes/Paginacion';
import Grilla from './layouts/main/Grid';
import { useFetchGet } from './hook/FetchGet';
// import { Filtro } from './componentes/Filtro';

import spinner from "./assets/bx_loader.gif";
import { HiBars3 } from "react-icons/hi2";
import SignIn from './layouts/main/SignIn';
import { ThemeCustom } from "./context/ThemeCustom";
import { OrdenShopProvider } from './context/OrdenShop';
import { DataBDProvider } from './context/DataBd';

import NavAppBar from './layouts/header/NavAppBar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error404 } from './pages/Error404';
import { IniciarSesion } from './pages/IniciarSesion';
import { Inicio } from './pages/Inicio';
import { Productos } from './pages/Productos';
import { Registrarse } from './pages/Registrarse';
import { Product } from './pages/Product';
import Ckeckout from './layouts/finalCompra/Checkout'
import FooterFinal from './layouts/footer/FooterFinal';
import './App.css';
import { PagoCompra } from './pages/PagoCompra';
import { OrdenesUsuario } from './pages/OrdenesUsuario';

import '@splidejs/react-splide/css';





function App() {


  // const [pag, setPag] = useState(1);
  // const [pagTotal, setPagTotal] = useState(1);
  // const URLBase = "https://dummyjson.com/products"
  // const [URL, setURL] = useState(URLBase)
  const [isLoading, setIsLoading] = useState(true);
  // const { inicializarDataBD } = useContext(DataBDContext)
  // useFetchGet({ URL, setProducts,  isLoading, setIsLoading })
  // console.log("dataProd:", products)
  const theme = ThemeCustom();
  document.body.style.backgroundColor = theme.palette.primary.main;
  // inicializarDataBD()
 
  
  // const { products } = useContext(DataBDContext);


  return (
    <>
      <ThemeProvider theme={theme}>

        <CssBaseline />
        <DataBDProvider>
          <OrdenShopProvider>

            <NavAppBar />
            <main style={{ marginTop: '78px', marginBottom: '98px' }}>
              <Routes>
                <Route path="/" element={<Inicio/>} />
                <Route path="/signIn" element={<IniciarSesion/>} />
                <Route path="/signUp" element={<Registrarse/>} />
                <Route path="/productos" element={<Productos/>} />
                <Route path="/product/:id" element={<Product/>} />
                <Route path="/compra" element={<PagoCompra />} />
                <Route path="/userOrders" element={<OrdenesUsuario />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </main>
            <footer>

              <FooterFinal />
            </footer>
          </OrdenShopProvider>
        </DataBDProvider>
      </ThemeProvider>
    </>
  )
}

export default App