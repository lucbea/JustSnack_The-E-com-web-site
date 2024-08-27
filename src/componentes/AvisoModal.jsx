import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AvisoModal = ({ open, handleClose }) => {
    // Se usa `useEffect` para cerrar el modal después de 6 segundos
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                handleClose();
            }, 6000); // 6000 ms = 6 segundos

            return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
        }
    }, [open, handleClose]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Ya está logueado
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Ha iniciado sesión correctamente.
                </Typography>
            </Box>
        </Modal>
    );
};
