import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeCustom } from "../../context/ThemeCustom";
import { OrdenShopContext } from '../../context/OrdenShop';
import { StyleFooter } from './StyleFooter';
import { LiaFacebookF, LiaInstagram, LiaTwitter } from "react-icons/lia";


function Copyright({ theme }) {
  return (
    <Typography 
    sx={{
      fontSize: '8px',
      color: theme.palette.primary.manteca,
      marginBottom: '6px',
      marginTop: { xs: '0px', sm: '6px' },
    }} >
      {'Copyright © '}
      <span 
      style={{
        fontSize: '12px',
        fontWeight: '900',
        color: theme.palette.primary.blanco,
      }}>
        <Link to="/" 
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          JusTsnak
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
    <Box 
    sx={{
      position: 'absolute',
      bottom: '0px',
      right: '0px'
    }}>
      <Typography 
      sx={{
        fontSize: '6px',
        marginRight: { xs: '10px', sm: '30px' },
        marginBottom: { xs: '0px', sm: '5px' },
        color: theme.palette.primary.manteca,
        '&:hover': {
                borderColor: theme.palette.primary.blanco,
                color: theme.palette.primary.blanco,
                fontWeight: 900, 
            },
      }}>
        {'POWERED by  '}
        <a href="https://github.com/lucbea" 
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          <span 
          style={{
            fontSize: '10px',
            fontWeight: 900,
            color:'inherit',
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
  const { isLoggedIn,  handleLogout } = useContext(OrdenShopContext);
  // const navigate = useNavigate();  

  
  // const handleCerrarSesion = () => {
  //   handleLogout();  
  //   navigate('/');  
  // };
 
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
            <Box sx={{ ...stFooter.contRedes }}>
              <Box sx={{ ...stFooter.bordeIconoRed }}>
                <Link to="/" style={{ display: 'flex', color:'inherit',  fontWeight: 'inherit' }} >
                  <LiaFacebookF style={{ ...stFooter.iconoRed }} />
                </Link>
              </Box>
              <Box sx={{ ...stFooter.bordeIconoRed }}>
                <Link to="/" style={{ display: 'flex', color:'inherit',  fontWeight: 'inherit' }}>
                  <LiaInstagram style={{ ...stFooter.iconoRed }} />
                </Link>
              </Box>
              <Box sx={{ ...stFooter.bordeIconoRed }}>
                <Link to="/" style={{ display: 'flex', color:'inherit',  fontWeight: 'inherit', fontSize:'inherit' }}>
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
