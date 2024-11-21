import { useNavigate } from "react-router-dom";
import { ThemeCustom } from "../context/ThemeCustom";
import { StyleHeader } from "../layouts/header/StyleHeader";
import { useContext, useEffect, useState } from "react";
import { OrdenShopContext } from "../context/OrdenShop";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { StyleSpinner } from "../hook/StyleSpinner";

export const ConfirmarPedido = () => {
  const theme = ThemeCustom();
  const stHeader = StyleHeader({ theme });
  const StSpinner = StyleSpinner({ theme }); 
  const navigate = useNavigate();

  const { ordenCarro, totalCarro, handleConfirmarPedido, isLoggedIn, user } = useContext(OrdenShopContext);

  const [showTable, setShowTable] = useState(false);

  useEffect (() => {
    localStorage.setItem('404', JSON.stringify(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setShowTable(true);

    } else {
      setShowTable(false);
      navigate("/")
    }
  }, [isLoggedIn, ordenCarro]);

  return (
    <>
      {showTable && ordenCarro.length === 0 && (
        <Box onClick={() => navigate('/')}>
          <Box
            sx={{ ...StSpinner.boxMesagge }}>
            No hay items en el carro. Elige productos para agregar. Haz click para continuar.
          </Box>
        </Box>
      )}
      {showTable && ordenCarro.length > 0 && (
        <Box sx={{ padding: { xs: '0px', sm: '16px' } }}>
          <Box sx={{ marginBottom: '16px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginBottom: '8px' }}>Hola {user.nombre},</Box>
            <span style={{ fontSize: '14px' }}>Revisa tu orden de compra y confirma el pedido para continuar.</span>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: theme.palette.primary.sombraBox }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '12px', padding: '5px', display: { xs: 'none', sm: 'flex' } }}>Imagen</TableCell>
                  <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }}>Nombre</TableCell>
                  <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px', }}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Cantidad</Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>Cant.</Box>
                  </TableCell>

                  <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }}>Precio Unitario</TableCell>
                  <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }}>Total del Ítem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordenCarro.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ fontSize: '12px', padding: '3px', display: { xs: 'none', sm: 'flex' } }}>
                      <img src={item.imagen} alt={item.nombre} style={{ width: '30px', height: '30px' }} />
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }}>{item.nombre}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }}>{item.cantidadPedida}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }}>${item.precio.toFixed(2)}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '10px', sm: '12px' }, padding: '5px' }} >${item.totalItem.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: { xs: '13px', sm: '15px' } }}>
              <p style={{ fontWeight: 'bold', fontSize: 'inherit' }}>Total de la compra:</p>
              <span style={{ fontSize: 'inherit', fontWeight: 'bold' }}>${totalCarro.toFixed(2)}</span>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { handleConfirmarPedido() }}
              sx={{
                marginLeft: 'auto',
                padding: '10px',
                ...stHeader.btnFooterCarro,
                fontSize: { xs: '10px', sm: '12px' },
              }}
            >
              Confirmar Pedido
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};


