// import React from 'react';
// import { Box } from '@mui/material';
// import { ThemeCustom } from '../context/ThemeCustom';

// export const MarqueInicio = () => {
//   const theme = ThemeCustom();

//   return (
//     <Box
//       sx={{
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         width: '100%',
//         backgroundColor: theme.palette.primary.dorado, // O el color de fondo que prefieras
//         padding: '10px 0', // Ajusta el padding si es necesario
//       }}
//     >
//       <Box
//         sx={{
//           display: 'inline-block',
//           whiteSpace: 'nowrap',
//           animation: 'marquee 20s linear infinite', // Cambia la duración aquí
//           color: theme.palette.primary.blanco, // O el color de texto que prefieras
//           fontSize: '18px', // Ajusta el tamaño del texto si es necesario
//           fontWeight: 'bold',
//           paddingLeft: '100%', // Empuja el texto hacia fuera de la vista inicial
//         }}
//       >
//         {'SANA ENERGÍA - Promoción final de estación: 10% de descuento en todos los productos - COMÉ SANO, COMÉ RICO, COMÉ BIEN - Promoción final de estación: 10% de descuento en todos los productos - '}
//       </Box>
//     </Box>
//   );
// };

// // Asegúrate de agregar estos estilos en un archivo CSS o en una etiqueta <style> dentro de tu componente
// const styles = `
//   @keyframes marquee {
//     0% { transform: translateX(0); }
//     100% { transform: translateX(-100%); }
//   }
// `;

// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);



// import React from 'react';

// export const MarqueeInicio = () => {
//     return (
//         <div <style>
//                 {`
//                     @keyframes marquee {
//                         0% {
//                             transform: translateX(100%);
//                         }
//                         100% {
//                             transform: translateX(-100%);
//                         }
//                     }
//                 `}
//             </style>
//         >
//         <div className="marquee-container" style={{
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             width: '100%',
//             backgroundColor: '#f4f4f4',/* Color de fondo */
//             padding: '10px 0', /* Espaciado arriba y abajo */
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         }}>
//             <div className="marquee-text" style={{
//                 display: 'inlineBlock',
//                 whiteSpace: 'nowrap',
//                 animation: 'marquee 10s linear infinite',
//                 color: '#333', /* Color del texto */
//                 fontSize: '18px', /* Tamaño del texto */
//                 fontWeight: 'bold',
//             }}>
//                 SANA ENERGÍA - Promoción final de estación: 10% de descuento en todos los productos - COMÉ SANO, COMÉ RICO, COMÉ BIEN - Promoción final de estación: 10% de descuento en todos los productos -
//             </div>
//         </div>
//         </div >
//     );
// };

// // @keyframes marquee {
// //     0% {
// //         transform: translateX(100%);
// //     }
// //     100% {
// //         transform: translateX(-100%);
// //     }
// // }


import React from 'react';

export const MarqueeInicio = () => {
    return (
        <div>
            <style>
                {`
                    @keyframes marquee {
                        0% {
                            transform: translateX(100%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }

                    .marquee-container {
                  
                        overflow: hidden;
                        white-space: nowrap;
                        width: -webkit-fill-available;
                        background-color: #f4f4f4;
                        padding: 5px 0;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        height: 30px;
                    }

                    .marquee-text {
                        display: inline-block;
                        white-space: nowrap;
                        animation: marquee 60s linear infinite;
                        color: #333;
                        font-size: 18px;
                        font-weight: bold;
                    }
                `}
            </style>
            <div className="marquee-container">
                <div className="marquee-text">
                    <h2> SANA ENERGÍA </h2>
                      -  Promoción final de estación: 10% de descuento en todos los productos - COMÉ SANO, COMÉ RICO, COMÉ BIEN - Promoción final de estación: 10% de descuento en todos los productos -
                </div>
                <div className="marquee-text">
                    SANA ENERGÍA - Promoción final de estación: 10% de descuento en todos los productos - COMÉ SANO, COMÉ RICO, COMÉ BIEN - Promoción final de estación: 10% de descuento en todos los productos -
                </div>
            </div>
        </div>
    );
};
