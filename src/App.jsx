
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@splidejs/react-splide/css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeCustom } from "./context/ThemeCustom";
import { OrdenShopProvider } from './context/OrdenShop';
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
import './App.css';
import { ConfirmarPedido } from './pages/ConfirmarPedido';


function App() {

  // const [isLoading, setIsLoading] = useState(true);
  const theme = ThemeCustom();
  const navigate = useNavigate();
  document.body.style.backgroundColor = theme.palette.primary.main;

  useEffect (()=>{
    navigate('/')
  },[])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataBDProvider>
          <OrdenShopProvider>
            <NavAppBar />
            <ConfirmarPedido/>
            <main style={{ 
              marginTop: theme.breakpoints.down('sm') ? '128px' : '118px',
              marginBottom: '98px', minHeight:'50vh' }}>
              <Routes>
                <Route path="/" element={<Inicio/>} />
                <Route path="/signIn" element={<IniciarSesion/>} />
                <Route path="/signUp" element={<Registrarse/>} />
                <Route path="/productos" element={<Productos/>} />
                <Route path="/productos/:id" element={<Product/>} />
                <Route path="/compra" element={<PagoCompra />} />
                <Route path="/userOrders" element={<OrdenesUsuario />} />
                <Route path="/confirmar_pedido" element={<ConfirmarPedido />} />
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