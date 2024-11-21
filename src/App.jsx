import { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importamos para manejar la sesión de Firebase
import { auth } from '../firebase'; 
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
  // const { isLoggedIn, setIsLoggedIn  } = useContext(OrdenShopContext);
  const theme = ThemeCustom();
  const navigate = useNavigate();
  document.body.style.backgroundColor = theme.palette.primary.main;

  // useEffect(() => {
  //   localStorage.setItem('isLoggedIn', JSON.stringify(false));
  //   const usuarioActual = localStorage.getItem('usuarioActual');
  //   const error404 = JSON.parse(localStorage.getItem('404'));

  //   if (!error404) { 
  //     if (usuarioActual) {
  //       try {
  //         const usuario = JSON.parse(usuarioActual);
  //         if (usuario) {
  //           // navigate('/signIn'); 
  //         }
  //       } catch (error) {
  //         console.error("Error al parsear 'usuarioActual' desde localStorage:", error);
  //       }
  //     }
  //   }
   
  // }, []);


  useEffect(() => {
    // Verificar el estado de autenticación cuando se recarga la página
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('usuarioActual', JSON.stringify(user.uid)); // Guarda el UID del usuario
        // setIsLoggedIn(true)
      } else {
        // El usuario no está autenticado
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        localStorage.removeItem('usuarioActual');
        // setIsLoggedIn(false);
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);




  // useEffect(() => {
  //   // Verificar el estado de autenticación cuando se recarga la página
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // El usuario está autenticado
  //       localStorage.setItem('isLoggedIn', JSON.stringify(true));
  //       localStorage.setItem('usuarioActual', JSON.stringify(user.uid)); // Guarda el UID del usuario
  //     } else {
  //       // El usuario no está autenticado
  //       localStorage.setItem('isLoggedIn', JSON.stringify(false));
  //       localStorage.removeItem('usuarioActual');
  //     }
  //     localStorage.setItem('isLoggedIn', JSON.stringify(false));
  //       const usuarioActual = localStorage.getItem('usuarioActual');
  //       const error404 = JSON.parse(localStorage.getItem('404'));
    
  //       if (!error404) { 
  //         if (usuarioActual) {
  //           try {
  //             const usuario = JSON.parse(usuarioActual);
  //             if (usuario) {
  //               // navigate('/signIn'); 
  //             }
  //           } catch (error) {
  //             console.error("Error al parsear 'usuarioActual' desde localStorage:", error);
  //           }
  //         }
  //       }
  //   });

  //   // Limpiar el listener cuando el componente se desmonte
  //   return () => unsubscribe();
  // }, []);

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
