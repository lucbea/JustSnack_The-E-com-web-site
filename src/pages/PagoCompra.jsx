
import { Box } from "@mui/material"
import { ThemeCustom } from "../context/ThemeCustom";
import { useNavigate } from "react-router-dom";

export const PagoCompra = () => {
    const theme = ThemeCustom();
    const navigate = useNavigate();
   
    const finalizarCompra = () => {
        navigate(`/`);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative', minHeight:'30vh'}}>
            <Box onClick={() => finalizarCompra()} sx={{ cursor: 'pointer', width: '90vw', height: '60vh', backgroundColor: theme.palette.modal.blanco, maxWidth: '800px', boxShadow: theme.palette.primary.sombra, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: 'inherit', paddingInline: '16px' }}>
                    <Box sx={{ fontSize: { xs: '16px', sm: '24px', md: '28px' }, margin: 0 }}>
                        <h2 style={{ fontSize: 'inherit' }}> La compra fue efectuada.</h2>
                    </Box>
                    <Box sx={{ fontSize: { xs: '13px', sm: '16px', md: '20px' }, margin: 0 }}>
                        <h3 style={{ fontSize: 'inherit' }}>
                        El carro se ha vaciado porque se procedió a efectuar la compra y disminuir el stock de los productos seleccionados.
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