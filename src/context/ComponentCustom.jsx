import { createTheme } from '@mui/material/styles';
import { ThemeCustom } from '../context/ThemeCustom';

export const ComponentCustom = () => {
    const theme = ThemeCustom();
    return createTheme({
        components: {
            colorTexto: {
               color: theme.palette.primary.azul},
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            fontSize: '15px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'inherit', 
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'inherit', 
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderWidth: '2px',
                            },
                            '& .MuiInputBase-input': {
                                padding: '5px 14px',
                            },
                            '& .MuiInputAdornment-root': {
                                display: 'none', 
                            },
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: '8px',
                        },
                    },
                    '& .MuiInputLabel-shrink': {
                        color: theme.palette.primary.azul, 
                        fontSize:'6px',
                        transform:'translate(14px, -9px) scale(0.5)',
                    },
                    "&.Mui-error": {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.rojo, 
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.rojo 
                        },
                    },
                    noError: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.azul 
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.azul 
                        },
                    },
                },
            },
        },
    });
};
