

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ThemeCustom } from "../../context/ThemeCustom";
import BadgeHamb from '../../componentes/BadgeHamb';
import BadgeShop from '../../componentes/BadgeShop';
import { BadgeUser } from '../../componentes/BadgeUser';
import { OrdenShopContext } from '../../context/OrdenShop';
import { UserContext } from '../../context/Users';
import { Button, TextField } from '@mui/material';
import { StyleHeader } from './StyleHeader';
import BadgeTrash from '../../componentes/BadgeTrash';
import { FiMinus, FiPlus } from "react-icons/fi";

export default function NavAppBar() {
  const theme = ThemeCustom();
  const stHeader = StyleHeader({ theme });
  const navigate = useNavigate(); // Initialize useNavigate
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);// State to manage login status
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);
  const { ordenCarro, setOrdenCarro, totalCarro, setAgregarCarro } = useContext(OrdenShopContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleCarMenuClose = () => setMobileMoreAnchorEl(null);
  const handleCarMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleRemoveItem = (item) => {
    setOrdenCarro(ordenCarro.filter(o => o.id !== item.id));
    setAgregarCarro();
  };

  const handleModifCantItem = (item, cantPedida) => {
    if (isNaN(cantPedida) || cantPedida <= 0) return;
    const totalItem = parseFloat((item.price * cantPedida).toFixed(2));
    setOrdenCarro(ordenCarro.map(o =>
      o.id === item.id ? { ...item, cantidadPedida: cantPedida, totalItem } : o
    ));
  };

  const handleIncrement = (item) => {
    const itemEncont = ordenCarro.find(o => o.id === item.id);
    if (!itemEncont) return;
    const cantPedAux = itemEncont.cantidadPedida + 1;
    if (itemEncont.stock >= cantPedAux) handleModifCantItem(item, cantPedAux);
  };

  const handleDecrement = (item) => {
    const itemEncont = ordenCarro.find(o => o.id === item.id);
    if (!itemEncont) return;
    const cantPedAux = itemEncont.cantidadPedida - 1;
    if (cantPedAux > 0) handleModifCantItem(item, cantPedAux);
  };

  const handleTextChange = (item, cantPed) => {
    const itemEncont = ordenCarro.find(o => o.id === item.id);
    if (!itemEncont) return;
    const cantPedAux = Math.min(cantPed, item.stock);
    handleModifCantItem(item, cantPedAux);
  };

  const handleLogin = () => {
    navigate('/signin'); // Navigate to SignIn page
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderCarShop = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="carr-shop-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleCarMenuClose}
      sx={{
        backgroundColor: theme.palette.modal.fondo,
        overflowY: 'auto',
        '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': { top: '60px !important' },
        '& .MuiMenu-list': { position: 'relative', border: '2px solid red' }
      }}
    >
      {ordenCarro.length > 0 ? (
        ordenCarro.map((item) => (
          <MenuItem key={item.id} sx={{ ...stHeader.contenItem, cursor: 'auto' }}>
            <Box sx={{ ...stHeader.contenEncab }}>
              <Box sx={{ ...stHeader.contenImg }}>
                <img src={item.images} alt={item.title} style={{ ...stHeader.img }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box sx={{ ...stHeader.borrarBox, ...stHeader.contenTit }}>
                  <p style={{ ...stHeader.parrafo, ...stHeader.tit }}>{item.title}</p>
                </Box>
                <Box sx={{ ...stHeader.contenPEC }}>
                  <Box sx={{ ...stHeader.borrarBox, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '60px' }}>
                    <p style={{ ...stHeader.parrafo, textAlign: 'center' }}>Precio unitario:</p>
                    <span style={stHeader.span}>{item.price}</span>
                  </Box>
                  <Box sx={{ width: '80px', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%', display: 'flex', marginTop: '3px', '&:hover': { boxShadow: theme.palette.primary.sombra } }}>
                      <Button
                        variant="outlined"
                        sx={{ color: theme.palette.primary.dorado, border: theme.palette.primary.borde, width: '20px', padding: '2px', minWidth: '20px', height: '34px', borderRadius: '0%' }}
                        onClick={() => handleDecrement(item)}
                      >
                        <FiMinus style={{ color: 'black', fontSize: "16px", margin: "3px" }} />
                      </Button>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={item.cantidadPedida || ''}
                        onClick={(e) => e.target.select()}
                        onChange={(e) => {
                          const newValue = Number(e.target.value);
                          if (newValue >= 1 && newValue <= item.stock) {
                            handleTextChange(item, newValue);
                          }
                        }}
                        InputProps={{
                          inputProps: { min: 1, max: item.stock },
                          sx: {
                            padding: 0,
                            '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
                            '& input[type=number]': { MozAppearance: 'textfield' }
                          }
                        }}
                        sx={{ width: '40px', padding: '0px', height: '34px', '& .MuiInputBase-input': { textAlign: 'center', padding: '0px', height: '34px', color: theme.palette.primary.grisMuyOsc }, '& .MuiOutlinedInput-root': { borderRadius: '0%' } }}
                      />
                      <Button
                        variant="outlined"
                        sx={{ color: theme.palette.primary.dorado, border: theme.palette.primary.borde, width: '20px', padding: '2px', minWidth: '20px', height: '34px', borderRadius: '0%' }}
                        onClick={() => handleIncrement(item)}
                      >
                        <FiPlus style={{ color: 'black', fontSize: "16px", margin: "3px" }} />
                      </Button>
                    </Box>
                    <Box sx={{ color: theme.palette.primary.grisCarroFont, fontSize: '12px', textAlign: 'center', marginTop: '3px' }}>
                      Stock: <span style={{ color: theme.palette.primary.grisCarroFont, fontSize: '12px' }}>{item.stock}</span>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '75px' }}>
                    <p style={{ ...stHeader.parrafo, textAlign: 'center' }}>Total del ítem:</p>
                    <span style={stHeader.span}>{item.totalItem || '0.00'}</span>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton onClick={() => handleRemoveItem(item)} color="inherit">
                  <BadgeTrash />
                </IconButton>
              </Box>

            </Box>

          </MenuItem>
        ))
      ) : (
        <MenuItem>No hay órdenes</MenuItem>
      )}
    </Menu>
  );


  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
      sx={{ top: '48px' }}
    >
      {isLoggedIn
        ? [
            <MenuItem key="perfil" onClick={() => setAnchorEl(null)}>Perfil</MenuItem>,
            <MenuItem key="cuenta" onClick={() => setAnchorEl(null)}>Mi cuenta</MenuItem>,
            <MenuItem key="logout" onClick={() => { setAnchorEl(null); handleLogout(); }}>Cerrar sesión</MenuItem>
          ]
        : [
            <MenuItem key="login" onClick={handleLogin}>Iniciar sesión</MenuItem>,
            <MenuItem key="signup" onClick={() => { setAnchorEl(null); navigate('/signup'); }}>Registrarse</MenuItem>
          ]
      }
    </Menu>
  );
  

  return (
    <AppBar position="static" sx={{ position: 'fixed', top: '0', left: '0', zIndex: 20, display: 'flex', justifyContent: 'center', minWidth: '280px' }}>
      <Box sx={{ position: 'fixed', top: '-12px', left: '0px', zIndex: '10', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minWidth: '280px', backgroundColor: theme.palette.primary.main }}>
        <h1 style={{ fontSize: '28px' }}>JusT<span style={{ marginLeft: '3px', fontSize: '24px' }}>snacK</span></h1>
      </Box>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', zIndex: '30' }}>
        <IconButton size="large" edge="start" aria-label="open drawer" onClick={handleProfileMenuOpen} sx={{ mr: 2, color: theme.palette.primary.grisMuyOsc, '&:hover': { backgroundColor: theme.palette.primary.hoverBtn } }}>
          <BadgeHamb />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginInline: '10px', gap: '20px', width: 'auto' }}>
          <IconButton size="large" aria-label="shop" aria-controls="carr-shop-menu-mobile" aria-haspopup="true" onClick={handleCarMenuOpen} color="inherit" sx={{ '&:hover': { backgroundColor: theme.palette.primary.hoverBtn } }}>
            <BadgeShop total={totalCarro} />
          </IconButton>
          <IconButton size="large" edge="end" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit" sx={{ color: theme.palette.primary.grisMuyOsc, '&:hover': { backgroundColor: theme.palette.primary.hoverBtn } }}>
            <BadgeUser />
          </IconButton>
        </Box>
      </Toolbar>
      {renderCarShop}
      {renderMobileMenu}
    </AppBar>
  );
}
