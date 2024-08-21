
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CiLock } from "react-icons/ci";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeCustom } from "../context/ThemeCustom";
import { componentCustom } from '../context/ComponentCustom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{fontSize:'10px'}}>
      <Link  color="inherit" href="/" sx={{fontSize:'14px', fontWeight:900}}>
        JustSnack
      </Link>{' '}
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const theme = ThemeCustom();
  const component = componentCustom();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("data", data)
    
    // Obtener el estado del checkbox
    let notific = data.get('check'); 
    if (notific == "siNotificar") {notific="true"} else
    {notific="false"}
    
    const userReg = {
      nombre: data.get('nombre'),
      apellido: data.get('apellido'),
      email: data.get('email'),
      password: data.get('password'),
      notificaciones: notific, 
    }
    const userRegJson = JSON.stringify(userReg);

    // Guardar la cadena JSON en localStorage
    localStorage.setItem('user', userRegJson);
    navigate('/signIn');

   
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.rojo }}>
            <CiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{height:'16px'}}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                  InputProps={{
                    sx: {
                      fontSize: '15px',
                      paddingBlock: '2px',
                      ...component.bordeInp,
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: '12px',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  InputLabelProps={{
                    sx: {
                      fontSize: '12px',
                    }
                  }}
                  InputProps={{
                    sx: component.bordeInp
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Dirección de E-mail"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{
                    sx: {
                      fontSize: '12px',
                    }
                  }}
                  InputProps={{
                    sx: component.bordeInp
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    sx: {
                      fontSize: '12px',
                    }
                  }}
                  InputProps={{
                    sx: component.bordeInp
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel
        
        control={<Checkbox value="siNotificar" name="check" color="primary" />}
        label="Deseo recibir información sobre novedades y promociones via e-mail."
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '10px', 
          },
          '& .MuiCheckbox-root': {
         
            '&.Mui-checked': {
              color: theme.palette.primary.azul, // Color del checkbox cuando está marcado
            },
          },
        }}
      />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1.5, backgroundColor:theme.palette.primary.btnReg, '&:hover': {
            bgcolor: theme.palette.primary.azul} }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="#" variant="body2" sx={{color: theme.palette.primary.btnReg, '&:hover': {
            color: theme.palette.primary.azul, fontWeight:'900'}}}>
                  Iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
