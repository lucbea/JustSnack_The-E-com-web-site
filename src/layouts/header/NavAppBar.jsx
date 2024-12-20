import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut,  onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, TextField } from '@mui/material';
import { OrdenShopContext } from '../../context/OrdenShop';
import { ThemeCustom } from "../../context/ThemeCustom";
import { Filtros } from '../../componentes/Filtros';
import BadgeTrash from '../../componentes/BadgeTrash';
import BadgeHamb from '../../componentes/BadgeHamb';
import BadgeShop from '../../componentes/BadgeShop';
import { BadgeUser } from '../../componentes/BadgeUser';
import { StyleHeader } from './StyleHeader';
import { FiMinus, FiPlus } from "react-icons/fi";
import { Ruta } from '../../componentes/Ruta';
import logo from '../../assets/justsnackFin.gif';
import justsnack from '../../assets/JusTsnaK.png';
import jtk from '../../assets/JTK.png';

export default function NavAppBar() {
  const theme = ThemeCustom();
  const stHeader = StyleHeader({ theme });
  const navigate = useNavigate();

  const { anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, hayItemsCarro, setHayItemsCarro, setModifItemCarro, ordenCarro, setOrdenCarro, setShowProducts, totalCarro, setAgregarCarro, setQuitarCarro, setVaciarCarro, handleIniciarCompra, handleVaciarCarro,  isLoggedIn, setIsLoggedIn, setBtnIniciarCompra, handleIncrement, handleModifCantItem, cantMaxStock, setAuxShowCarro, mjeCarroPend, setMjeCarroPend, cargarCarroLS, handleUserFB } = useContext(OrdenShopContext);
  const isMenuOpenUser = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isCarrOpen = Boolean(anclaMenuCarr);
  const handleMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMenuOpenClose = () => setMobileMoreAnchorEl(null);
  const handleProfileUser = (event) => setAnchorEl(event.currentTarget);
  const handleProfileUserClose = () => setAnchorEl(null);
  const handleCarMenuOpen = (event) => { setAnclaMenuCarr(event.currentTarget) };
  const handleCarMenuClose = () => setAnclaMenuCarr(null);
  const [userIn, setUserIn] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('usuarioActual', JSON.stringify(user.uid));
        handleUserFB(user.uid);
      } else {
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        localStorage.removeItem('usuarioActual');
      }
    });
    cargarCarroLS();
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const isLoggedInLS = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (isLoggedInLS !== null) {
      setUserIn(isLoggedInLS === true);
      setIsLoggedIn(isLoggedInLS === true)
    }
  }, [isLoggedIn]);


  useEffect(() => {
    setHayItemsCarro(ordenCarro.length > 0);
  }, [ordenCarro]);


  useEffect(() => {
    if (mjeCarroPend) {
      const timer = setTimeout(() => {
        setMjeCarroPend(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mjeCarroPend]);


  const handleLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigate('/inicio');
      } else {
        setIsLoggedIn(false);
        setAnchorEl(null);
        setMobileMoreAnchorEl(null);
        setAnclaMenuCarr(null);
        navigate('/signin');
      }
    });
  };


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            null
          } else {
            localStorage.setItem('usuarioActual', JSON.stringify(null));
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
            setIsLoggedIn(false);
            setAnchorEl(null);
            setMobileMoreAnchorEl(null);
            setAnclaMenuCarr(null);
            setOrdenCarro([]);
            navigate('/');
          }
        });
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };


  const handleNavigateToProducts = () => {
    setMobileMoreAnchorEl(null);
    setAnchorEl(null);
    setAnclaMenuCarr(null);
    setShowProducts(true);
    navigate('/productos');
  };


  const handleNavigateToHome = () => {
    setMobileMoreAnchorEl(null);
    setAnchorEl(null);
    setAnclaMenuCarr(null);
    navigate('/');
    setShowProducts(true);
  }


  const handleRemoveItem = (item) => {
    setAgregarCarro();
    setModifItemCarro();
    setVaciarCarro(false);
    setQuitarCarro(item);
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


  const handleMisOrdenes = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setAnclaMenuCarr(null);
    navigate('/userOrders');
  }


  const renderCarShop = (
    <Menu
      anchorEl={anclaMenuCarr}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id="carr-shop-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isCarrOpen}
      onClose={handleCarMenuClose}
      sx={{
        backgroundColor: theme.palette.modal.fondo,
        overflowY: 'auto',
        '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
          top: '60px !important',
          right: '16px !important',
          maxWidth: '700px'
        },
        '& .MuiMenu-list': {
          position: 'relative', paddingBlock: '5px', display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          minWidth: '248p'
        }
      }}
    >
      {ordenCarro.length > 0 ? (
        ordenCarro.map((item) => (
          <MenuItem key={item.id} sx={{ ...stHeader.contenItem, cursor: 'auto' }}>
            <Box sx={{ ...stHeader.contenItemBreakPoint }}>
              <Box sx={{ ...stHeader.contenEncab }}>
                <Box sx={{ ...stHeader.contenImg }}>
                  <img src={item.imagen} alt={item.imagen} style={{ ...stHeader.img }} />
                </Box>
                <Box sx={{ ...stHeader.borrarBox, ...stHeader.contenTit }}>
                  <p style={{ ...stHeader.parrafo, ...stHeader.tit }}>{item.nombre}</p>
                </Box>
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton onClick={() => handleRemoveItem(item)} color="inherit">
                    <BadgeTrash />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '200px' }}>
                <Box sx={{ ...stHeader.contenPEC }}>
                  <Box sx={{ ...stHeader.borrarBox, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '60px' }}>
                    <p style={{ ...stHeader.parrafo, textAlign: 'center' }}>Precio unitario:</p>
                    <span style={stHeader.span}>{item.precio}</span>
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
                        sx={{
                          width: '40px',
                          padding: '0px',
                          height: '34px',
                          '& .MuiInputBase-input': {
                            textAlign: 'center',
                            padding: '0px',
                            height: '34px',
                            color: theme.palette.primary.grisMuyOsc
                          },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0%'
                          }
                        }}
                      />
                      <Button
                        variant="outlined"
                        sx={{
                          color: theme.palette.primary.dorado,
                          border: theme.palette.primary.borde,
                          width: '20px',
                          padding: '2px',
                          minWidth: '20px',
                          height: '34px',
                          borderRadius: '0%'
                        }}
                        onClick={() => handleIncrement(item)}
                      >
                        <FiPlus style={{
                          color: 'black',
                          fontSize: "16px",
                          margin: "3px"
                        }} />
                      </Button>
                    </Box>
                    <Box sx={{
                      color: cantMaxStock ? theme.palette.primary.rojo : theme.palette.primary.grisCarroFont,
                      fontSize: '12px',
                      textAlign: 'center',
                      marginTop: '3px'
                    }}>
                      Stock: <span style={{
                        color: cantMaxStock ? theme.palette.primary.rojo : theme.palette.primary.grisCarroFont,
                        fontSize: '12px'
                      }}>{item.stock}</span>
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '75px'
                  }}>
                    <p style={{
                      ...stHeader.parrafo,
                      textAlign: 'center'
                    }}>Total del ítem:</p>
                    <span style={stHeader.span}>{item.totalItem || '0.00'}</span>
                  </Box>
                </Box>
              </Box>
              <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <IconButton onClick={() => handleRemoveItem(item)} color="inherit">
                  <BadgeTrash />
                </IconButton>
              </Box>
            </Box>
          </MenuItem>
        ))
      ) : (
        <MenuItem>
          <Box sx={{ margin: 'auto' }}>
            Sin productos seleccionados.
          </Box>
        </MenuItem>

      )}
      {hayItemsCarro && (
        <MenuItem sx={{ ...stHeader.footerCarro }}>
          <Box sx={{
            marginBottom: 'auto',
            position: 'absolute',
            top: 5,
            left: 12
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleVaciarCarro}
              sx={{
                display: 'flex',
                justifyContent: 'left',
                padding: '3px',
                fontSize: '8px',
                fontWeight: '800',
                boxShadow: '0px 0px 0px white',
                '&:hover': { backgroundColor: theme.palette.primary.hoverBtn }
              }}
            >
              Vaciar carro
            </Button>
          </Box >
          <Box sx={{
            display: 'flex',
            gap: '20px',
            marginTop: '5px',
            marginInline: '10px',
            width: '-webkit-fill-available',
            justifyContent: 'space-between'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <p style={{
                ...stHeader.parrafo,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>Total de la compra:</p>
              <span style={{
                ...stHeader.span,
                fontSize: '16px',
                fontWeight: 'bold'
              }}>{totalCarro.toFixed(2)}</span>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                setAnclaMenuCarr(null);
                setBtnIniciarCompra(e.currentTarget);
                handleIniciarCompra();
              }}
              sx={{ ...stHeader.btnFooterCarro }}
            >
              Iniciar compra
            </Button>
          </Box>
        </MenuItem>
      )}
    </Menu>
  );


  const renderUser = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpenUser}
      onClose={handleProfileUserClose}
      sx={{ top: '48px' }}
    >
      {userIn
        ? [
          <MenuItem key="cuenta" onClick={() => handleMisOrdenes()}>Mis órdenes de compra</MenuItem>,
          <MenuItem key="logout" onClick={() => { setAnchorEl(null); handleLogout() }}>Cerrar sesión</MenuItem>
        ]
        : [
          <MenuItem key="login" onClick={handleLogin}>Iniciar sesión</MenuItem>,
          <MenuItem key="signup" onClick={() => { setAnchorEl(null); navigate('/signup'); }}>Registrarse</MenuItem>
        ]
      }
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMobileMenuOpen}
      onClose={handleMenuOpenClose}
      sx={{ top: '48px' }}
    >
      <MenuItem key="inicio" onClick={handleNavigateToHome}>Inicio</MenuItem>
      <MenuItem key="productos" onClick={handleNavigateToProducts}>Productos</MenuItem>

      {isLoggedIn
        ? <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <MenuItem key="cuenta" onClick={handleMisOrdenes}>Mis órdenes de compra</MenuItem>
          <MenuItem key="logout" onClick={() => { setMobileMoreAnchorEl(null); handleLogout(); }}>Cerrar sesión</MenuItem>
        </Box>
        : <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <MenuItem key="login" onClick={handleLogin}>Iniciar sesión</MenuItem>
          <MenuItem key="signup" onClick={() => { setMobileMoreAnchorEl(null); navigate('/signup'); }}>Registrarse</MenuItem>
        </Box>
      }
    </Menu>
  );


  return (
    <Box position="static"
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 20,
        width: '-webkit-fill-available'
      }}>
      <AppBar position="static"
        sx={{
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: 33,
          display: 'flex',
          justifyContent: 'center',
          minWidth: '280px',
          boxShadow: theme.header.sombraBottom
        }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: '30',
            paddingInline: '6px',
            gap: '5px',
          }}>
          <IconButton size="large" edge="start" aria-label="open drawer" onClick={handleMenuOpen}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              ml: 0,
              color: theme.palette.primary.grisMuyOsc,
              '&:hover': {
                backgroundColor: theme.palette.primary.hoverBtn
              }
            }}>
            <BadgeHamb />
          </IconButton>
          <Box
            onClick={() => handleNavigateToHome()}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
              height: '80px',
              minWidth: '150px',
              backgroundColor: theme.palette.primary.main,
              cursor: 'pointer',
              position: 'relative'
            }}>
            <Box sx={{ display: 'flex', objectFit: 'cover', height: { xs: '90%', sm: '190%' }, alignItems: 'center', marginLeft: '5px', position: { sm: 'absolute' }, top: '-8px', left: '-20px' }}
              onClick={() => handleNavigateToHome()}>
              <img src={logo} alt="logo.png" style={{ height: '90%' }} />
            </Box>

            <Box sx={{ display: { xs: 'flex', sm: 'none' }, objectFit: 'cover', height: '90%', alignItems: 'center', marginLeft: '5px' }}
              onClick={() => handleNavigateToHome()}>
              <img src={jtk} alt="jtk.png" style={{ height: '60%' }} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, objectFit: 'cover', height: 'inherit', alignItems: 'center', marginLeft: { xs: '5px', sm: '117px' } }}>
              <img src={justsnack} alt="justsnack.png" style={{ height: '50%' }} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginInline: '0px',
              gap: '20px',
              width: 'auto'
            }}>
            <IconButton size="large" edge="start" aria-label="open drawer" onClick={handleMenuOpen}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                ml: 0,
                color: theme.palette.primary.grisMuyOsc,
                '&:hover': {
                  backgroundColor: theme.palette.primary.hoverBtn
                }
              }}>
              <BadgeHamb />
            </IconButton>
            <IconButton size="large" aria-label="shop" aria-controls="carr-shop-menu-mobile" aria-haspopup="true"
              onClick={(e) => {
                handleCarMenuOpen(e);
                setAuxShowCarro(e.currentTarget);
              }}
              color="inherit"
              sx={{
                marginInline: { xs: '0px', sm: '1px' },
                width: '52px',
                height: '52px',
                '&:hover': {
                  backgroundColor: theme.palette.primary.hoverBtn
                }
              }}>
              <BadgeShop />
            </IconButton>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" onClick={handleProfileUser} color="inherit"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                color: theme.palette.primary.grisMuyOsc,
                '&:hover': {
                  backgroundColor: theme.palette.primary.hoverBtn
                }
              }}>
              <BadgeUser />
            </IconButton>
          </Box>
          {mjeCarroPend && (
            <Box
              sx={{
                position: 'absolute',
                zIndex: '1000',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100vh',
                backgroundColor: theme.palette.modal.fondo,
              }}>
              <Box
                sx={{
                  marginTop: '70px',
                  marginLeft: 'auto',
                  marginRight: '20px',
                  width: 'max-content',
                  paddingInline: '30px',
                  paddingBlock: '1px',
                  fontSize: '14px',
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: theme.palette.primary.bordeCarroPend,
                  borderRadius: '4px',
                  color: theme.palette.primary.rojo,
                }}>
                <h2>Carro pendiente cargado</h2>
              </Box>
            </Box>
          )}
        </Toolbar>
        {renderMobileMenu}
        {renderCarShop}
        {renderUser}
      </AppBar>
      <Filtros />
      <Ruta />
    </Box>
  );
}
