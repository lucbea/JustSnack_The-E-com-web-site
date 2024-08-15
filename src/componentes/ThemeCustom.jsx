import { createTheme } from "@mui/material";

export const ThemeCustom = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        dorado: '#867a56',
        doradoClaro: '#d3ccba',
        grisOsc: '#757575',
        grisMuyOsc: '#4d4b4b',
        red: '#FF0000',
        negro: '#000000',
        hoverBtn: '#eaeaea',
        transparent: '#00000000',
      },
      secondary: {
        main: '#00F000',
      },
      background: {
        tarjeta: '#F2F2F2',
      },
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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    },
    transitBadge: {
      border: '2px solid blue',
      // backgroundColor:theme.palette.primary.main, 
      // color: theme.palette.primary.grisOsc, 
      transition: 'transform 0.3s', 
      '&:hover': {
        transform: 'scale(1.1)', 
        backgroundColor:'lightBlue',
        // backgroundColor: theme.palette.primary.main, 
      },
    }
  })
  return theme;
}