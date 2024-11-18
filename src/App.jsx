import { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@splidejs/react-splide/css';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { ThemeCustom } from "./context/ThemeCustom";
import { OrdenShopProvider } from './context/OrdenShop';
import { OrdenShopContext } from './context/OrdenShop';
import { DataBDProvider } from './context/DataBd';
import NavAppBar from './layouts/header/NavAppBar';
import FooterFinal from './layouts/footer/FooterFinal';
import { Error404 } from './pages/Error404';
import { IniciarSesion } from './pages/IniciarSesion';
import { Inicio } from './pages/Inicio';
import { Productos } from './pages/Productos';
import { Registrarse } from './pages/Registrarse';
import { Product } from './pages/Product';
import { PagoCompra } from './pages/PagoCompra';
import { OrdenesUsuario } from './pages/OrdenesUsuario';
import { ConfirmarPedido } from './pages/ConfirmarPedido';
import './App.css';

function App() {
  const theme = ThemeCustom();
  const navigate = useNavigate();
  document.body.style.backgroundColor = theme.palette.primary.main;
  // const { setIsLoggedIn, isLoggedIn } = useContext(OrdenShopContext);

  useEffect(() => {
    console.log("app useeffect")
   
    const usuarioActual = localStorage.getItem('usuarioActual');
    const error404 = JSON.parse(localStorage.getItem('404'));

    console.log(usuarioActual, error404)
    if (!error404) { 
      console.log("404 false")
      if (usuarioActual) {
        console.log("hay usuarioActual en LS")
        try {
          const usuario = JSON.parse(usuarioActual);
          if (usuario) {
            console.log("el usuario esta en ls, se va a solicitar volver a ingresar",)
            // navigate('/signIn'); 
          }
        } catch (error) {
          console.error("Error al parsear 'usuarioActual' desde localStorage:", error);
        }
      }
    }
   
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataBDProvider>
          <OrdenShopProvider>
            <NavAppBar />
            <main style={{
              paddingTop: theme.breakpoints.down('md') ? '155px' : '118px',
              marginBottom: '98px',
              minHeight: '50vh'
            }}>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/signIn" element={<IniciarSesion />} />
                <Route path="/signUp" element={<Registrarse />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:id" element={<Product />} />
                <Route path="/compra" element={<PagoCompra />} />
                <Route path="/userOrders" element={<OrdenesUsuario />} />
                <Route path="/confirmarPedido" element={<ConfirmarPedido />} />
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
  );
}

export default App;
