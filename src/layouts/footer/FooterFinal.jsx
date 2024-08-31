

import { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeCustom } from "../../context/ThemeCustom";
import { OrdenShopContext } from '../../context/OrdenShop';
import { LiaFacebookF, LiaInstagram, LiaTwitter } from "react-icons/lia";
import { StyleFooter } from './StyleFooter';


function Copyright({ theme }) {
  return (
    <Typography sx={{
      fontSize: '8px',
      color: theme.palette.primary.manteca,
      marginBottom: '6px',
      marginTop: { xs: '0px', sm: '6px' },
    }} >
      {'Copyright © '}
      <span style={{
        fontSize: '12px',
        fontWeight: '900',
        color: theme.palette.primary.blanco,
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          JustSnack
        </Link>
      </span>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function CopyrightLB({ theme }) {
  return (
    <Box sx={{
      position: 'absolute',
      bottom: '0px',
      right: '0px'
    }}>
      <Typography sx={{
        fontSize: '6px',
        marginRight: { xs: '10px', sm: '30px' },
        marginBottom: { xs: '0px', sm: '5px' },
        color: theme.palette.primary.manteca,
      }}>
        {'POWERED by  '}
        <a href="https://github.com/lucbea" style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 900,
          }}>
            {' '}LucBea
          </span>
        </a>
      </Typography>
    </Box>

  );
}


export default function FooterFinal() {
  const theme = ThemeCustom();
  const stFooter = StyleFooter({ theme });
  const { isLoggedIn, setIsLoggedIn, user, setUser, handleLogout } = useContext(OrdenShopContext);
  const navigate = useNavigate();  // Inicializar el hook useNavigate

  // Función para manejar el cierre de sesión y redirección
  const handleCerrarSesion = () => {
    handleLogout();  // Llamar a handleLogout para cerrar sesión
    navigate('/');  // Redirigir a la página de inicio
  };
 
  return (
    <>
      <Box
        sx={{ ...stFooter.contenFooter }}
      >
        <Box
          component="footer"
          sx={{ ...stFooter.footer }}
        >
          <Box >
            <Box sx={{ ...stFooter.contenEnlacesPage }}>
              <Box sx={{ ...stFooter.boxEnlacePage }}>
                <Link to="/" style={{ ...stFooter.enlace }}>INICIO</Link>
              </Box>
              <Box sx={{ ...stFooter.boxEnlacePage }}>
                <Link to="/productos" style={{ ...stFooter.enlace }}>PRODUCTOS</Link>
              </Box>
              {(isLoggedIn) ?
                <Box sx={{ ...stFooter.boxEnlacePage }}>
                  <a href="#" onClick={handleCerrarSesion} style={{ ...stFooter.enlace }}>Cerrar sesión</a>
                </Box>
                :
                <Box sx={{ ...stFooter.boxEnlacePage }}>
                  <Link to="/signIn" style={{ ...stFooter.enlace }}>Iniciar sesión</Link>
                </Box>
              }
            </Box>
            <Box sx={{ ...stFooter.contRedes }}>
              <Box sx={{ ...stFooter.bordeIconoRed }}>
                <Link to="/" style={{ display: 'flex' }} >
                  <LiaFacebookF style={{ ...stFooter.iconoRed }} />
                </Link>
              </Box>
              <Box sx={{ ...stFooter.bordeIconoRed }}>
                <Link to="/" style={{ display: 'flex' }}>
                  <LiaInstagram style={{ ...stFooter.iconoRed }} />
                </Link>
              </Box>
              <Box sx={{ ...stFooter.bordeIconoRed }}>
                <Link to="/" style={{ display: 'flex' }}>
                  <LiaTwitter style={{ ...stFooter.iconoRed }} />
                </Link>
              </Box>

            </Box>
            <Copyright theme={theme} />
          </Box>
          <CopyrightLB theme={theme} />
        </Box>
      </Box>
    </>
  );
}
