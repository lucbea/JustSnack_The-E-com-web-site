
// import { createTheme } from "@mui/material";
// import { ThemeCustom } from "../context/ThemeCustom";

// export const componentCustom = () => {
//     const theme = ThemeCustom();
//     const component = createTheme({
//         components: {
//             MuiTextField: {
//               styleOverrides: {
//                 root: {
//                   // Estilo general para el TextField
//                   '& .MuiOutlinedInput-root': {
//                     fontSize: '15px',
//                     borderColor: 'inherit',
//                     '& .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'inherit', // Se sobrescribe según el estado
//                     },
//                     '&:hover .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'inherit', // Se sobrescribe según el estado
//                     },
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderWidth: '2px',
//                     },
//                     '& .MuiInputBase-input': {
//                       padding: '5px 14px',
//                     },
//                   },
//                   '& .MuiFormHelperText-root': {
//                     fontSize: '8px',
//                   },
//                 },
//                 // Estilo condicional para el borde en estado de error
//                 error: {
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'red', // Color del borde en estado de error
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'darkred', // Color del borde en estado de error cuando está enfocado
//                   },
//                 },
//                 // Estilo condicional para el borde cuando no hay error
//                 noError: {
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'blue', // Color del borde cuando no hay error
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'darkblue', // Color del borde cuando no hay error y está enfocado
//                   },
//                 },
//               },
//             },
//           },
//         });
//     return component;
// }


// componentCustom.js
import { createTheme } from '@mui/material/styles';
import { ThemeCustom } from '../context/ThemeCustom';

export const componentCustom = () => {
    const theme = ThemeCustom();
    return createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            fontSize: '15px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'inherit', // Se sobrescribe según el estado
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'inherit', // Se sobrescribe según el estado
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderWidth: '2px',
                            },
                            '& .MuiInputBase-input': {
                                padding: '5px 14px',
                            },
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: '8px',
                        },
                    },
                    error: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.rojo, // Color del borde en estado de error
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.rojo // Color del borde en estado de error cuando está enfocado
                        },
                    },
                    noError: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.azul // Color del borde cuando no hay error
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.azul // Color del borde cuando no hay error y está enfocado
                        },
                    },
                },
            },
        },
    });
};
