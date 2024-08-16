
import React, { useContext, useState } from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import { ThemeCustom } from "../context/ThemeCustom";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { OrdenShopContext } from '../context/OrdenShop';
import { Box, Button, TextField } from '@mui/material';


// const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {

//   const { item, onChange, value } = props; 
//   const { ordenCarro, setOrdenCarro } = useContext(OrdenShopContext);
//   const numericValue = Number(value);
//   const [ nuevoValor, setNuevoValor ] = useState (1);

//   const handleIncrement = () => {
//     const newValue = Math.min(numericValue + 1, item.stock);
//     if (newValue <= item.stock){
//       setNuevoValor(newValue);
//     }
//     onChange(nuevoValor);
//   };

//   const handleDecrement = () => {
//     const newValue = Math.max(numericValue - 1, 1);
//     // console.log("estoy BAJANDO:", newValue)
//     onChange(newValue);
//   };



//   return (
//     <BaseNumberInput
//       slots={{
//         root: StyledInputRoot,
//         input: StyledInput,
//         incrementButton: StyledButton,
//         decrementButton: StyledButton,
//       }}
//       slotProps={{
//         incrementButton: {
//           children: <FiPlus fontSize="16px" margin="3px" />,
//           className: 'increment',
//           onClick: handleIncrement,
//         },
//         decrementButton: {
//           children: <FiMinus fontSize="16px" margin="3px"/>,
//           onClick: handleDecrement,
//         },
//       }}
//       {...props}
//       ref={ref}
//     />
//   );
// });


// const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  // const { item, onChange, value } = props;
  // const numericValue = Number(value);

  // // Incrementa el valor
  // const handleIncrement = () => {
  //   const newValue = Math.min(numericValue + 1, item.stock);
  //   onChange(newValue);
  // };

  // // Decrementa el valor
  // const handleDecrement = () => {
  //   const newValue = Math.max(numericValue - 1, 1);
  //   onChange(newValue);
  // };

  // return (
    // <BaseNumberInput
    //   slots={{
    //     root: StyledInputRoot,
    //     input: StyledInput,
    //     incrementButton: StyledButton,
    //     decrementButton: StyledButton,
    //   }}
    //   slotProps={{
    //     incrementButton: {
    //       children: <FiPlus fontSize="16px" margin="3px" />,
    //       className: 'increment',
    //       onClick: handleIncrement,
    //     },
    //     decrementButton: {
    //       children: <FiMinus fontSize="16px" margin="3px"/>,
    //       onClick: handleDecrement,
    //     },
    //   }}
    //   value={numericValue}  // Asegúrate de que el valor sea un número
    //   {...props}
    //   ref={ref}
    // />
  // );
// });



export default function CantidadInput({ item, ...props }) {
  const { ordenCarro, setOrdenCarro } = useContext(OrdenShopContext);
  const [value, setValue] = useState(item.cantidadPedida || 1);

  // const { item, onChange, value } = props;
  const numericValue = Number(value);

  // Incrementa el valor
  const handleIncrement = () => {
    
    const newValue = Math.min(numericValue + 1, item.stock);
    console.log("SUBO", newValue)
    setValue(newValue);

  };

  // Decrementa el valor
  const handleDecrement = () => {
    const newValue = Math.max(numericValue - 1, 1);
    // onChange(newValue);
    setValue(newValue);
  };


  const handleModifCantItem = (item, precioUn) => {
    const cantPed = value;
    const totalItemDec = (precioUn * cantPed).toFixed(2);
    const totalItem = parseFloat(totalItemDec);
    const updatedOrder = ordenCarro.map(o =>
      o.id === item.id ? { ...item, cantidadPedida: cantPed, totalItem } : o
    );
    setOrdenCarro(updatedOrder);
  };

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  //   handleModifCantItem(item, item.price);
  // };

  return (
    <>
    {/* <NumberInput
      aria-label="Cantidad Input"
      min={1}
      max={item.stock}
      value={value}
      onChange={handleChange}  // Asegúrate de que esta función se llame al cambiar el valor
      item={item}
      {...props}
    /> */}
    <Box sx={{width:'70px'}}>
      <Button variant="outlined"
        sx={{width:'15px'}}
      >
        <FiPlus style = {{fontSize:"16px", margin:"3px"}} />
      </Button>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="outlined" 
      sx = {{color: theme.palette.primary.dorado}}
      >{item.stock}</Button>
    </Box>
    {/* <BaseNumberInput
      key={item.id}
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <FiPlus fontSize="16px" margin="3px" />,
          className: 'increment',
          onClick: handleIncrement(item),
        },
        decrementButton: {
          children: <FiMinus fontSize="16px" margin="3px"/>,
          onClick: handleDecrement,
        },
      }}
      value={value}  // Asegúrate de que el valor sea un número
      {...props}
      // ref={ref}
    /> */}
    </>
  );
}




// export default function CantidadInput({ item, ...props }) {
//   const { ordenCarro, setOrdenCarro } = useContext(OrdenShopContext);
//   const [value, setValue] = useState (item.cantidadPedida || 1);
//   console.log("ITEM *****", item)
//   console.log("value ********", value)

//   const handleModifCantItem = (item,  precioUn) => {
//     console.log("entré a handleModifCantItem - value", item)
//     const cantPed = value;
//     const totalItemDec = (precioUn * cantPed).toFixed(2);
//     const totalItem = parseFloat(totalItemDec);
//     const updatedOrder = ordenCarro.map(o =>
//       o.id === item.id ? { ...item, cantidadPedida: cantPed, totalItem } : o
//     );
//     console.log("upDateOrder", updatedOrder)
//     setOrdenCarro(updatedOrder);
//     console.log("handleModifCantItem - ordenCarro", ordenCarro)
//   };


//   const handleChange = () => {
//     // setValue(newValue);
//     console.log("VALUE en handeChange ****", item)
//     handleModifCantItem(item, item.price );
//   };


//   return (
//     <NumberInput
//       aria-label="Cantidad Input"
//       min={1}
//       max={item.stock}
//       label="Cantidad"
//       variant="filled"
//       type="number"
//       value={value}
//       InputLabelProps={{ shrink: true }}
//       // onChange={ handleChange }
//       name={item.id}
//       inputProps={{
//         min: 1,
//         max: item.stock,
//       }}
//       // {...props}
//     />
//   );
// }


const theme = ThemeCustom();
console.log("theme LINEA 58", theme)

// const StyledInputRoot = styled('div')(() => `
//   font-family:  ${theme.typography.fontFamily};
//   font-weight: 400; 
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   backgroundColor: ${theme.palette.primary.dorado}
// `,
// );

// const StyledInput = styled('input')(() => `
//   font-size: 0.875rem;
//   font-family: inherit;
//   font-weight: 400;
//   line-height: 1.375;
//   color: ${theme.palette.primary.dorado}
//   background: ${theme.palette.mode === 'dark' ? theme.palette.primary.transparent : theme.palette.primary.transparent};
//   border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.grisCarroFont : theme.palette.primary.grisCarroFont};
//   border-radius: 2px;
//   margin: 0px;
//   padding: 9.5px 3px;
//   outline: 0;
//   min-width: 0;
//   width: 4rem;
//   text-align: center;

//   &:hover {
//     border-color: ${ theme.palette.primary.grisOsc};
//     background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
//   }

//   &:focus {
//     border-color: ${ theme.palette.primary.grisOsc};
//     background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
//   }

//   &:focus-visible {
//     outline: 0;
//   }`,
// );

// const StyledButton = styled('button')(() => `
//   font-family: ${theme.typography.fontFamily};
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   line-height: 1.5;
//   border: 1px solid;
//   border-radius: 2px;
//   border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.grisOsc : theme.palette.primary.girsOsc};
//   background: ${theme.palette.mode === 'dark' ? theme.palette.primary.transparent : theme.palette.primary.transparent };
//   color: ${theme.palette.mode === 'dark' ? theme.palette.primary.grisCarroFont : theme.palette.primary.grisCarroFont };
//   width: 22px;
//   height: 40px;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   transition-property: all;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//   transition-duration: 120ms;
//   padding:0px 2px;
//   margin:0px;

//   &:hover {
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main };
//     border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.grisOsc : theme.palette.primary.GrisOsc};
//     color: ${theme.palette.primary.shadow};
//   }

//   &:focus-visible {
//     outline: 0;
//   }

//   &.increment {
//     order: 1;
//   }
// `,
// );













// import React, { useContext } from 'react';
// import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
// import { styled } from '@mui/system';
// import { ThemeCustom } from "../context/ThemeCustom";
// import { FiMinus } from "react-icons/fi";
// import { FiPlus } from "react-icons/fi";
// import { OrdenShopContext } from '../context/OrdenShop';

// const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
   
//   return (
//     <BaseNumberInput
//       slots={{
//         root: StyledInputRoot,
//         input: StyledInput,
//         incrementButton: StyledButton,
//         decrementButton: StyledButton,
//       }}
//       slotProps={{
//         incrementButton: {
//           children: <FiPlus fontSize="16px" margin="3px" />,
//           className: 'increment',
//         },
//         decrementButton: {
//           children: <FiMinus fontSize="16px" margin="3px"/>,
//         },
//       }}
//       {...props}
//       ref={ref}
//     />
//   );
// });

// export default function CantidadInput({ item, ...props}) {
//   const { ordenCarro, setOrdenCarro, totalCarro, setTotalCarro, actualImport,
//     //  variaCantItems, setVariaCantItems, 
//     cantItems, setCantItems, quitarCarro, setQuitarCarro } = useContext(OrdenShopContext);
//     let ordenCarroPGuardar;
//   console.log("item",item);

//   const handleModifCantItem = (item, cantPedida, precioUn) => {
//     const totalItemDec = (precioUn * cantPedida).toFixed(2);
//     const totalItem = parseFloat(totalItemDec);
//     ordenCarroPGuardar = ordenCarro.map(o =>
//       o.id === item.id ? { ...item, cantidadPedida: cantPedida, totalItem } : o
//     );
//     console.log("guardo el nuevo item - ordenCarroPGuardar", ordenCarroPGuardar.length, item.stock)
//     setOrdenCarro(ordenCarroPGuardar);
//   };




//   return <NumberInput aria-label="Cantidad Input" min={1} max={149}
//   label="Cantidad"
// variant="filled"
// type="number"
// value={item.cantidadPedida || 1}
// // min={1}
// InputLabelProps={{ shrink: true }}
// onChange={(e) => {
//   const newValue = Number(e.target.value);
//   console.log("viendo el valor number del input:", newValue)
//   if (newValue >= 1 && newValue <= item.stock) {
//     console.log("estoy en if del input", newValue, item, item.price)
//     handleModifCantItem(item, newValue, item.price);
//   } else {console.log("ingrese por el false en el if")}
// }
// }
// inputProps={{
//   min: 1,
//   max: item.stock
// }}
//   />;
// }
// const theme = ThemeCustom();
// console.log("theme LINEA 58", theme)

// const StyledInputRoot = styled('div')(
//   (// { theme } 
//   ) => `
//   font-family:  ${theme.typography.fontFamily};
//   font-weight: 400; 
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   backgroundColor: ${theme.palette.primary.dorado}
// `,
// );

// const StyledInput = styled('input')((
//   // { theme }
// ) => `
//   font-size: 0.875rem;
//   font-family: inherit;
//   font-weight: 400;
//   line-height: 1.375;
//   color: ${theme.palette.primary.dorado}
//   background: ${theme.palette.mode === 'dark' ? theme.palette.primary.transparent : theme.palette.primary.transparent};
//   border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.grisCarroFont : theme.palette.primary.grisCarroFont};
//   border-radius: 2px;
//   margin: 0px;
//   padding: 9.5px 3px;
//   outline: 0;
//   min-width: 0;
//   width: 4rem;
//   text-align: center;

//   &:hover {
//     border-color: ${ theme.palette.primary.grisOsc};
//     background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
//   }

//   &:focus {
//     border-color: ${ theme.palette.primary.grisOsc};
//     background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
//   }

//   &:focus-visible {
//     outline: 0;
//   }`,
// );

// const StyledButton = styled('button')(
//   (
//     // { theme }
//   ) => `
//   font-family: ${theme.typography.fontFamily};
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   line-height: 1.5;
//   border: 1px solid;
//   border-radius: 2px;
//   border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.grisOsc : theme.palette.primary.girsOsc};
//   background: ${theme.palette.mode === 'dark' ? theme.palette.primary.transparent : theme.palette.primary.transparent };
//   color: ${theme.palette.mode === 'dark' ? theme.palette.primary.grisCarroFont : theme.palette.primary.grisCarroFont };
//   width: 22px;
//   height: 40px;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   transition-property: all;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//   transition-duration: 120ms;
//   padding:0px 2px;
//   margin:0px;

//   &:hover {
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main };
//     border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.grisOsc : theme.palette.primary.GrisOsc};
//     color: ${theme.palette.primary.shadow};
//   }

//   &:focus-visible {
//     outline: 0;
//   }

//   &.increment {
//     order: 1;
//   }
// `,
// );



// sx={{
//   paddingBlock: '0px',
//   // backgroundColor: theme.palette.primary.transparent,
//   '& .MuiFilledInput-root': {
//     backgroundColor: theme.palette.primary.transparent, // Cambia el color de fondo aquí
//   },

//   // Ajusta el estilo del label
//   '& .MuiFormLabel-root': {
//     top: '-7px',
//     color: theme.palette.primary.grisCarroFont,
//   },
//   '& .MuiInputBase-input': {
//     // Asegura que las flechas sean visibles
//     WebkitAppearance: 'number',
//     appearance: 'number',
//     // paddingRight: '2em',
//   },

//   '& .MuiInputBase-root': {
//     '&::before': {
//       borderBottom: 'none !important', // Elimina el borde inferior
//     },
//     '&:hover::before': {
//       borderBottom: 'none !important', // Asegura que no aparezca el borde en hover
//     },
//     '&.Mui-focused::before': {
//       borderBottom: 'none !important', // Asegura que no aparezca el borde cuando está enfocado
//     },
//   }
// }}