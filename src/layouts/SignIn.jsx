

import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { GoPerson } from "react-icons/go";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeCustom } from "../context/ThemeCustom";
import { ComponentCustom } from '../context/ComponentCustom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Users';


const defaultTheme = createTheme();

export default function SignIn() {
    const theme = ThemeCustom();
    const component = ComponentCustom();
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        // Obtener datos del localStorage
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);
            // Verificar si el usuario existe y las credenciales coinciden
            if (user.email === email && user.password === password) {
                console.log('Inicio de sesión exitoso');
                setIsLoggedIn (true);
                setUser ( email, password );
                console.log ( user, isLoggedIn );
                navigate('/home'); // Redirigir a la página de inicio (ajusta la ruta según tu aplicación)
            } else {
                console.log('Correo electrónico o contraseña incorrectos');
                // Aquí podrías mostrar un mensaje de error en el UI
            }
        } else {
            console.log('No se encontraron datos de usuario en el almacenamiento local');
            // Aquí podrías mostrar un mensaje de error en el UI
        }
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
                        <GoPerson />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, justifyContent: 'flex-start' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Dirección de E-mail"
                            name="email"
                            autoComplete="email"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                        <Box sx={{ width: '100%', ml: 1, textAlign: 'left' }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recordarme"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '10px',
                                    },
                                    '& .MuiCheckbox-root': {
                                        '&.Mui-checked': {
                                            color: theme.palette.primary.azul,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1.5, backgroundColor: theme.palette.primary.btnReg, '&:hover': {
                                bgcolor: theme.palette.primary.azul
                            } }}
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container sx={{ flexDirection: 'column' }}>
                            <Grid item xs>
                                <Button sx={{
                                    color: theme.palette.primary.btnReg,
                                    bgcolor: theme.palette.primary.transparent,
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        color: theme.palette.primary.azul,
                                        fontWeight: '700',
                                        bgcolor: theme.palette.primary.transparent
                                    }
                                }}>
                                    ¿Olvidaste tu contraseña?
                                </Button>
                            </Grid>
                            <Grid item sx={{ cursor: 'pointer' }}>
                                <Button sx={{
                                    color: theme.palette.primary.btnReg,
                                    bgcolor: theme.palette.primary.transparent,
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        color: theme.palette.primary.azul,
                                        fontWeight: '900',
                                        bgcolor: theme.palette.primary.transparent
                                    }
                                }}>
                                    ¿No tienes cuenta? Regístrate
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
