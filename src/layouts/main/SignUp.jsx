
import React, { useContext, useState } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';
import { ThemeCustom } from "../../context/ThemeCustom";
import { ComponentCustom } from '../../context/ComponentCustom';
import FormHelperText from '@mui/material/FormHelperText';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Iconos para mostrar/ocultar contraseña
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { v4 as uuidv4 } from 'uuid';
import { OrdenShopContext } from '../../context/OrdenShop';

const defaultTheme = createTheme();

export default function SignUp() {
  const theme = ThemeCustom();
  const component = ComponentCustom();
  const navigate = useNavigate();
  const { user, setUser } = useContext(OrdenShopContext);

  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    check: false,
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nombre':
        if (!value) error = 'El nombre es obligatorio.';
        else if (value.length < 4) error = 'Mínimo 4 caracteres.';
        break;
      case 'apellido':
        if (!value) error = 'El apellido es obligatorio.';
        else if (value.length < 4) error = 'Mínimo 4 caracteres.';
        break;
      case 'email':
        if (!value) error = 'El correo electrónico es obligatorio.';
        else if (!value.includes('@')) error = 'El correo electrónico debe contener "@"';
        break;
      case 'password':
        if (!value) error = 'La contraseña es obligatoria.';
        else if (value.length < 8) error = 'Mínimo 8 caracteres.';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  // const handleSubmitRegister = (event) => {
  //   event.preventDefault();
  //   console.log("ingresé a handleSubmit registro")
  //   const newErrors = {
  //     nombre: values.nombre ? (values.nombre.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El nombre es obligatorio.',
  //     apellido: values.apellido ? (values.apellido.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El apellido es obligatorio.',
  //     email: values.email ? (values.email.includes('@') ? '' : 'El correo electrónico debe contener "@"') : 'El correo electrónico es obligatorio.',
  //     password: values.password ? (values.password.length >= 8 ? '' : 'Mínimo 8 caracteres.') : 'La contraseña es obligatoria.'
  //   };
  
  //   setErrors(newErrors);
  //   if (Object.values(newErrors).some(error => error !== '')) {
  //     return; // Si hay errores, no proceder
  //   }
  
  //   // Obtener los usuarios registrados desde localStorage
  //   const usersLSJsonArray = localStorage.getItem('user');
  //   let existeUsers = null;
  //   if (usersLSJsonArray) {
  //     existeUsers = JSON.parse(usersLSJsonArray);
  //   }
  
  //   const isEmailRegistered = existeUsers.some(user => user.email === values.email);
  //   if (isEmailRegistered) {
  //       console.log("el correo está registrado");
  //       setErrors(prevErrors => ({
  //           ...prevErrors,
  //           email: 'El correo electrónico ya está registrado. Inicie sesión.'
  //       }));
  //       return; // Detener el registro si el correo ya está registrado
  //   }
  
  //   // Si no hay errores y el correo no está registrado, proceder con el registro
  //   const notific = values.check ? 'true' : 'false';
  // const userReg = {
  //       userId: uuidv4(),
  //       nombre: values.nombre,
  //       apellido: values.apellido,
  //       email: values.email,
  //       password: values.password,
  //       notificaciones: notific,
  //   };

  //   // Agregar el nuevo usuario al array de usuarios registrados
  //   existeUsers.push(userReg);

  //   // Guardar el array actualizado en localStorage
  //   const usersRegJson = JSON.stringify(existeUsers);
  //   localStorage.setItem('users', usersRegJson);

  //   // Guardar el usuario actual en un nuevo elemento llamado 'usuarioActual'
  //   localStorage.setItem('usuarioActual', JSON.stringify(userReg));

  //   console.log("userRegJson:", JSON.stringify(userReg));
  //   console.log("Usuarios actualizados en localStorage:", usersRegJson);

  //   navigate('/signIn'); // Redirigir al inicio de sesión
  // };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    console.log("ingresé a handleSubmit registro");

    // Validaciones
    const newErrors = {
        nombre: values.nombre ? (values.nombre.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El nombre es obligatorio.',
        apellido: values.apellido ? (values.apellido.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El apellido es obligatorio.',
        email: values.email ? (values.email.includes('@') ? '' : 'El correo electrónico debe contener "@"') : 'El correo electrónico es obligatorio.',
        password: values.password ? (values.password.length >= 8 ? '' : 'Mínimo 8 caracteres.') : 'La contraseña es obligatoria.'
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error !== '')) {
        return; // Si hay errores, no proceder
    }

    // Obtener los usuarios registrados desde localStorage
    const usersLSJsonArray = localStorage.getItem('users'); // Modificación aquí: Cambiado 'user' a 'users'
    let existeUsers = []; // Inicializar como un array vacío por defecto
    if (usersLSJsonArray) {
        try {
            existeUsers = JSON.parse(usersLSJsonArray);
            if (!Array.isArray(existeUsers)) { // Modificación aquí: Verificación si es un array
                // Si los datos no son un array, reinicializar como array vacío
                existeUsers = [];
            }
        } catch (error) {
            // Modificación aquí: Manejo de errores en caso de fallo en el parseo
            console.error("Error al parsear 'users' del localStorage:", error);
            existeUsers = [];
        }
    }

    // Verificar si el correo ya está registrado
    const isEmailRegistered = existeUsers.some(user => user.email === values.email); // Modificación aquí: Verificación en el array
    if (isEmailRegistered) {
        console.log("el correo está registrado");
        setErrors(prevErrors => ({
            ...prevErrors,
            email: 'El correo electrónico ya está registrado. Inicie sesión.'
        }));
        return; // Detener el registro si el correo ya está registrado
    }

    // Si no hay errores y el correo no está registrado, proceder con el registro
    const notific = values.check ? 'true' : 'false';

    const userReg = {
        userId: uuidv4(),
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        password: values.password,
        notificaciones: notific,
    };

    // Modificación aquí: Agregar el nuevo usuario al array de usuarios registrados
    existeUsers.push(userReg);

    // Guardar el array actualizado en localStorage
    const usersRegJson = JSON.stringify(existeUsers); // Modificación aquí: Guardar en 'users'
    localStorage.setItem('users', usersRegJson); // Modificación aquí: Guardar en 'users'

    // Guardar el usuario actual en un nuevo elemento llamado 'usuarioActual'
    localStorage.setItem('usuarioActual', JSON.stringify(userReg));

    console.log("userRegJson:", JSON.stringify(userReg));
    console.log("Usuarios actualizados en localStorage:", usersRegJson);

    // Navegar al inicio de sesión
    navigate('/signIn');
};




  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: '0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.rojo }}>
              <CiLock />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear cuenta
            </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmitRegister} sx={{ marginTop:'16px', width:'100%', maxWidth:'600px' }}>
            <Box sx={{
              width: '100%',
              display: 'grid',
              // flexDirection: {xs:'column', sm:'row'}, 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: '3%'
            }}>
              <Box sx={{ position: 'relative', marginBottom: '30px' }}>
                <span
                  style={{
                    color: theme.palette.primary.azul,
                    fontSize: '10px',
                    position: 'absolute',
                    top: '-19px',
                    left: '10px',
                    paddingBottom: '0px',
                    paddingRight: '15px',
                    paddingLeft: '15px',
                    marginTop: '3px',
                    marginBottom: '0px',
                    zIndex: '3',
                    backgroundColor: theme.palette.primary.blanco,
                    transition: 'background-color 0.3s',
                  }}
                >
                  Nombre *
                </span>
                <TextField
                  // autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  // autoFocus
                  value={values.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  InputProps={{
                    sx: {
                      // Aplica estilos condicionalmente
                      ...(errors.nombre ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError),
                      '& .MuiOutlinedInput-input': {
                        paddingBlock: '6px',
                        fontSize: '14px', 
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      transform: 'translate(14px, -9px) scale(0.3)',
                      display: 'none',
                    }
                  }}
                />
                {errors.nombre && (
                  <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute' }}>
                    {errors.nombre}
                  </FormHelperText>
                )}
              </Box>
              <Box sx={{ position: 'relative', marginBottom: '30px' }}>
                <span
                  style={{
                    color: theme.palette.primary.azul,
                    fontSize: '10px',
                    position: 'absolute',
                    top: '-16.5px',
                    left: '10px',
                    paddingBottom: '0px',
                    paddingRight: '15px',
                    paddingLeft: '15px',
                    marginTop: '3px',
                    marginBottom: '0px',
                    zIndex: '3',
                    backgroundColor: theme.palette.primary.blanco,
                    transition: 'background-color 0.3s',
                  }}
                >
                  Apellido *
                </span>
                <TextField
                  name="apellido"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  value={values.apellido}
                  onChange={handleChange}
                  error={!!errors.apellido}
                  InputProps={{
                    sx: {
                      ...(errors.apellido ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError),
                      '& .MuiOutlinedInput-input': {
                        paddingBlock: '6px',
                        fontSize: '14px',
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      transform: 'translate(14px, -9px) scale(0.3)',
                      display: 'none',
                    }
                  }}
                />
                {errors.apellido && (
                  <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute' }}>
                    {errors.apellido}
                  </FormHelperText>
                )}
              </Box>
            </Box>

            <Box sx={{ position: 'relative', marginBottom: '30px' }}>
              <span
                style={{
                  color: theme.palette.primary.azul,
                  fontSize: '10px',
                  position: 'absolute',
                  top: '-16.5px',
                  left: '10px',
                  paddingBottom: '0px',
                  paddingRight: '15px',
                  paddingLeft: '15px',
                  marginTop: '3px',
                  marginBottom: '0px',
                  zIndex: '3',
                  backgroundColor: theme.palette.primary.blanco,
                  transition: 'background-color 0.3s',
                }}
              >
                Dirección de E-mail *
              </span>
              <TextField
                required
                fullWidth
                id="email"
                label="Dirección de E-mail"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                InputProps={{
                  sx: {
                    ...(errors.email ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError),
                    '& .MuiOutlinedInput-input': {
                      paddingBlock: '6px',
                      fontSize: '14px',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    transform: 'translate(14px, -9px) scale(0.3)',
                    display: 'none',
                  }
                }}
              />
              {errors.email && (
                <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute' }}>
                  {errors.email}
                </FormHelperText>
              )}
            </Box>

            {/* </Box> */}

            <Box sx={{ position: 'relative', marginBottom: '10px' }}>
              <span
                style={{
                  color: theme.palette.primary.azul,
                  fontSize: '10px',
                  position: 'absolute',
                  top: '-16.5px',
                  left: '10px',
                  paddingBottom: '0px',
                  paddingRight: '15px',
                  paddingLeft: '15px',
                  marginTop: '3px',
                  marginBottom: '0px',
                  zIndex: '3',
                  backgroundColor: theme.palette.primary.blanco,
                  transition: 'background-color 0.3s',
                }}
              > Password
              </span>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                // sx={{ mt: 1.5 }}
                InputProps={{

                  sx: {
                    // Aplica estilos condicionalmente
                    ...(errors.password ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError),
                    '& .MuiOutlinedInput-input': {
                      paddingBlock: '6px',
                      fontSize: '14px',
                    },

                  },
                }}
                InputLabelProps={{
                  sx: {
                    transform: 'translate(14px, -9px) scale(0.3)',
                    display: 'none',
                  }
                }}
              />

              {errors.password && (
                <FormHelperText error sx={{ display: 'block', fontSize: '8px' }}>
                  {errors.password}
                </FormHelperText>
              )}
            </Box>
            <FormControlLabel
              control={<Checkbox checked={values.check} onChange={handleChange} name="check" color="primary" />}
              label="Deseo recibir información via e-mail."
              sx={{
                marginTop:{xs:'0px', sm:'15px'},
                marginBottom:'20px',
                height:'10px',
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
            // fullWidth
            variant="contained"
            sx={{
              marginTop: {xs:'6px', sm:'16px'}, 
              marginBottom: {xs:'24px', sm:'6px'},
              width:'100%',
              maxWidth:'216px',

              backgroundColor: theme.palette.primary.btnReg,
              '&:hover': {
                bgcolor: theme.palette.primary.azul
              }
            }}
            onClick={(e) => handleSubmitRegister(e)}
          >
            Registrarse
          </Button>
          <Button
            onClick={() => navigate('/signIn')}
            sx={{
              display: {xs:'none', sm:'flex'},
              color: theme.palette.primary.btnReg,
              bgcolor: theme.palette.primary.transparent,
              textTransform: 'capitalize',
              '&:hover': {
                color: theme.palette.primary.azul,
                fontWeight: '900',
                bgcolor: theme.palette.primary.transparent
              }
            }}
          >
             <span style={{ fontSize: '8px', marginRight: '4px' }}>¿Tienes cuenta? </span> Inicia sesión
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
