import { createTheme } from "@mui/material";

export const ThemeCustom = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 550,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        main: '#FFFFFF',
        dorado: '#867a56',
        doradoClaro: '#a99b75',
        grisOsc: '#757575',
        grisMuyOsc: '#4d4b4b',
        grisFooter: '#595f7e',
        red: '#FF0000',
        negro: '#000000',
        negro87: '#000000de',
        hoverBtn: '#eaeaea',
        transparent: '#00000000',
        grisCarroFont: '#737373',
        sombra: '0px 0px 10px #9b9696',
        sombraTarj: '-1px -1.3px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        sombraBox:  '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 0px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        btnReg: '#6a6e8c',
        rojo: '#b0273c',
        verde: '#228563',
        verdeBrill: '#2cb586',
        azul:'#787eac',
        borde: '1px solid #737373',
        bordeItemCarro: 'inset 0px -1px 0px 0px #dae1df',
        blanco: '#FFFFFF',
        transparente: '00000000',
        manteca: '#d7d3d3',
        backFiltro: '#e4e6ea',
        bordeCarroPend: 'inset 0px 0px 0px 9px #dae1df',
      },
      secondary: {
        main: '#00F000',
      },
      background: {
        tarjeta: '#F2F2F2',
      },
      modal: {
        fondo: '#17161696',
      },
    },

    header:{
      sombraBottom:'0px 2px 4px -1px #595f7e52, 1px 2px 8px 0px #595f7e4f, 0px 1px 17px 0px #595f7e42',
    },

    tabla:{
      delimita: '1px dotted #e7e0e0',
      delimitaSolid: '1px solid #e7e0e0',
      delimitaDoble: '3px double #e7e0e0'
    },

    typography: {
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
   
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    transitBadge: {
      border: '2px solid blue',
      transition: 'transform 0.3s', 
      '&:hover': {
        transform: 'scale(1.1)', 
        backgroundColor:'lightBlue', 
      },
    },
    cardStyle: {
      shadow: '0px 0px 10px #9b9696',
    },
  })
  return theme;
}