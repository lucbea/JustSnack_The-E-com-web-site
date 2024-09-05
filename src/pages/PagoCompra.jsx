
import { Box } from "@mui/material"
import { ThemeCustom } from "../context/ThemeCustom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { OrdenShopContext } from "../context/OrdenShop";

export const PagoCompra = () => {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    const { anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, hayItemsCarro, setHayItemsCarro, setModifItemCarro, ordenCarro, setOrdenCarro, showProducts, setShowProducts, totalCarro, setTotalCarro, setAgregarCarro, setQuitarCarro, vaciarCarro, setVaciarCarro, vaciarCarrito, handleIniciarCompra, handleLogin, handleLogout, handlePerfil, isLoggedIn, setIsLoggedIn, user, setUser } = useContext(OrdenShopContext);

    const finalizarCompra = () => {
        //Aquí llamar función para disminuir el stock
        cierreVentana();
    }

    const cierreVentana = () => {
        navigate(`/`);
        setOrdenCarro([]);
        setTotalCarro(0);
    }

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight:'70vh'}}>
            <Box onClick={() => finalizarCompra()} sx={{ cursor: 'pointer', width: '90vw', height: '60vh', backgroundColor: theme.palette.modal.blanco, maxWidth: '800px', boxShadow: theme.palette.primary.sombra, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px', margin: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: 'inherit', padding: '16px' }}>
                    <Box sx={{ fontSize: { xs: '16px', sm: '24px', md: '28px' }, margin: 0 }}>
                        <h2 style={{ fontSize: 'inherit' }}> Esta sección es para generar los pagos de las compras a desarrollar en un futuro.</h2>
                    </Box>
                    <Box sx={{ fontSize: { xs: '13px', sm: '16px', md: '20px' }, margin: 0 }}>
                        <h3 style={{ fontSize: 'inherit' }}>
                            El carro se vaciará para simular el proceso de compra que se gestionará a partir de aquí.
                        </h3>
                    </Box>
                    <Box sx={{ fontSize: { xs: '10px', sm: '13px', md: '16px' }, margin: 0 }}>
                    <h4 style={{ fontSize: 'inherit' }}>
                        Haga click sobre esta ventana para cerrarla.
                    </h4>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}