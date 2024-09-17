//confirmarPedido.jsx
import { useNavigate } from "react-router-dom";
import { ThemeCustom } from "../context/ThemeCustom";
import { StyleHeader } from "../layouts/header/StyleHeader";
import { useContext } from "react";
import { OrdenShopContext } from "../context/OrdenShop";
import { Box, Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";

export const ConfirmarPedido = () => {

  const theme = ThemeCustom();
  const stHeader = StyleHeader({ theme });
  const navigate = useNavigate();

  const { anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, hayItemsCarro, setHayItemsCarro, setModifItemCarro, ordenCarro, setShowProducts, totalCarro, setAgregarCarro, setQuitarCarro, setVaciarCarro, handleIniciarCompra, handleLogin, handleLogout, isLoggedIn, setBtnIniciarCompra, handleIncrement, handleModifCantItem, cantMaxStock } = useContext(OrdenShopContext);
  const isMenuOpenUser = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isCarrOpen = Boolean(anclaMenuCarr);
  const handleCarMenuOpen = (event) => setAnclaMenuCarr(event.currentTarget);
  const handleCarMenuClose = () => setAnclaMenuCarr(null);

  return (
    <Box>ConfirmarPedido
      <Menu
      anchorEl={anclaMenuCarr}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id="confirmar-pedido"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   open={isCarrOpen}
    //   onClose={handleCarMenuClose}
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
                  {/* <IconButton onClick={() => handleRemoveItem(item)} color="inherit">
                    <BadgeTrash />
                  </IconButton> */}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '200px' }}>
                <Box sx={{ ...stHeader.contenPEC }}>
                  <Box sx={{ ...stHeader.borrarBox, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '60px' }}>
                    <p style={{ ...stHeader.parrafo, textAlign: 'center' }}>Precio unitario:</p>
                    <span style={stHeader.span}>{item.precio}</span>
                  </Box>
                  {/* <Box sx={{ width: '80px', display: 'flex', flexDirection: 'column' }}>
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
                  </Box> */}

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
                {/* <IconButton onClick={() => handleRemoveItem(item)} color="inherit">
                  <BadgeTrash />
                </IconButton> */}
              </Box>
            </Box>
          </MenuItem>
        ))
      ) : (
        <MenuItem>Sin productos seleccionados.</MenuItem>
      )}

      {hayItemsCarro && (

        <MenuItem sx={{ ...stHeader.footerCarro }}>
          <Box sx={{ 
            marginBottom: 'auto', 
            position: 'absolute', 
            top: 5, 
            left: 12 
            }}>
            {/* <Button
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
            </Button> */}
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
              onClick={(e) => { handleIniciarCompra(); setBtnIniciarCompra(e.currentTarget) }}
              sx={{ ...stHeader.btnFooterCarro }}
            >
              Confirmar Pedido
            </Button>
          </Box>
        </MenuItem>
      )}
    </Menu>
    </Box >
    )
  
}