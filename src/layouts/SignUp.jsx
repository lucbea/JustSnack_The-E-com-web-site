

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import { CiLock } from "react-icons/ci";
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { ThemeCustom } from "../context/ThemeCustom";
// import { componentCustom } from '../context/ComponentCustom';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ fontSize: '10px' }}>
//       <Link color="inherit" href="/" sx={{ fontSize: '14px', fontWeight: 900 }}>
//         JustSnack
//       </Link>{' '}
//       {'Copyright © '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// export default function SignUp() {
//   const theme = ThemeCustom();
//   const component = componentCustom();
//   const navigate = useNavigate();

//   // Estado para los valores de los campos
//   const [values, setValues] = useState({
//     nombre: '',
//     apellido: '',
//     email: '',
//     password: '',
//     check: false,
//   });

//   // Estado para errores
//   const [errors, setErrors] = useState({
//     nombre: '',
//     apellido: '',
//     email: '',
//     password: ''
//   });

//   // Manejador de cambio para los campos de entrada
//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;

//     setValues(prevValues => ({
//       ...prevValues,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Validar el campo actual
//     validateField(name, value);
//   };

//   // Validar un campo específico
//   const validateField = (name, value) => {
//     let error = '';

//     switch (name) {
//       case 'nombre':
//         if (!value) error = 'El nombre es obligatorio.';
//         else if (value.length < 4) error = 'Mínimo 4 caracteres.';
//         break;
//       case 'apellido':
//         if (!value) error = 'El apellido es obligatorio.';
//         else if (value.length < 4) error = 'Mínimo 4 caracteres.';
//         break;
//       case 'email':
//         if (!value) error = 'El correo electrónico es obligatorio.';
//         else if (!value.includes('@')) error = 'El correo electrónico debe contener "@"';
//         break;
//       case 'password':
//         if (!value) error = 'La contraseña es obligatoria.';
//         else if (value.length < 8) error = 'Mínimo 8 caracteres.';
//         break;
//       default:
//         break;
//     }

//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: error
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validar todos los campos al enviar el formulario
//     const newErrors = {
//       nombre: values.nombre ? (values.nombre.length > 4 ? '' : 'Mínimo 4 caracteres.') : 'El nombre es obligatorio.',
//       apellido: values.apellido ? (values.apellido.length > 4 ? '' : 'Mínimo 4 caracteres.') : 'El apellido es obligatorio.',
//       email: values.email ? (values.email.includes('@') ? '' : 'El correo electrónico debe contener "@"') : 'El correo electrónico es obligatorio.',
//       password: values.password ? (values.password.length >= 8 ? '' : 'Mínimo 8 caracteres.') : 'La contraseña es obligatoria.'
//     };

//     setErrors(newErrors);

//     // Si hay errores, no enviar el formulario
//     if (Object.values(newErrors).some(error => error !== '')) {
//       return;
//     }

//     const notific = values.check ? 'true' : 'false';
    
//     const userReg = {
//       nombre: values.nombre,
//       apellido: values.apellido,
//       email: values.email,
//       password: values.password,
//       notificaciones: notific,
//     };

//     const userRegJson = JSON.stringify(userReg);

//     // Guardar la cadena JSON en localStorage
//     localStorage.setItem('user', userRegJson);
    
//     // Redirigir a la página de inicio de sesión
//     navigate('/signIn');
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.rojo }}>
//             <CiLock />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Crear cuenta
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} sx={{ height: '16px' }}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="nombre"
//                   required
//                   fullWidth
//                   id="nombre"
//                   label="Nombre"
//                   autoFocus
//                   value={values.nombre}
//                   onChange={handleChange}
//                   error={!!errors.nombre}
//                   helperText={errors.nombre}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                   FormHelperTextProps={{
//                     sx: component.errorText,
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="apellido"
//                   label="Apellido"
//                   name="apellido"
//                   autoComplete="family-name"
//                   value={values.apellido}
//                   onChange={handleChange}
//                   error={!!errors.apellido}
//                   helperText={errors.apellido}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                   FormHelperTextProps={{
//                     sx: component.errorText,
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Dirección de E-mail"
//                   name="email"
//                   autoComplete="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   error={!!errors.email}
//                   helperText={errors.email}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                   FormHelperTextProps={{
//                     sx: component.errorText,
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Contraseña"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={values.password}
//                   onChange={handleChange}
//                   error={!!errors.password}
//                   helperText={errors.password}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                   FormHelperTextProps={{
//                     sx: component.errorText,
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox checked={values.check} onChange={handleChange} name="check" color="primary" />}
//                   label="Deseo recibir información sobre novedades y promociones via e-mail."
//                   sx={{
//                     '& .MuiFormControlLabel-label': {
//                       fontSize: '10px',
//                     },
//                     '& .MuiCheckbox-root': {
//                       '&.Mui-checked': {
//                         color: theme.palette.primary.azul, 
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2, mb: 1.5, backgroundColor: theme.palette.primary.btnReg, '&:hover': {
//                   bgcolor: theme.palette.primary.azul
//                 }
//               }}
//             >
//               Registrarse
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Button
//                   onClick={() => navigate('/signIn')}
//                   sx={{
//                     color: theme.palette.primary.btnReg,
//                     bgcolor: theme.palette.primary.transparent,
//                     textTransform: 'capitalize',
//                     '&:hover': {
//                       color: theme.palette.primary.azul,
//                       fontWeight: '900',
//                       bgcolor: theme.palette.primary.transparent
//                     }
//                   }}
//                 >
//                   Iniciar sesión
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         {/* <Copyright sx={{ mt: 4 }} /> */}
//       </Container>
//     </ThemeProvider>
//   );
// }



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import { CiLock } from "react-icons/ci";
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { ThemeCustom } from "../context/ThemeCustom";
// import { componentCustom } from '../context/ComponentCustom';
// import FormHelperText from '@mui/material/FormHelperText';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ fontSize: '10px' }}>
//       <Link color="inherit" href="/" sx={{ fontSize: '14px', fontWeight: 900 }}>
//         JustSnack
//       </Link>{' '}
//       {'Copyright © '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// export default function SignUp() {
//   const theme = ThemeCustom();
//   const component = componentCustom();
//   const navigate = useNavigate();

//   // Estado para los valores de los campos
//   const [values, setValues] = useState({
//     nombre: '',
//     apellido: '',
//     email: '',
//     password: '',
//     check: false,
//   });

//   // Estado para errores
//   const [errors, setErrors] = useState({
//     nombre: '',
//     apellido: '',
//     email: '',
//     password: ''
//   });

//   // Manejador de cambio para los campos de entrada
//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;

//     setValues(prevValues => ({
//       ...prevValues,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Validar el campo actual
//     validateField(name, value);
//   };

//   // Validar un campo específico
//   const validateField = (name, value) => {
//     let error = '';

//     switch (name) {
//       case 'nombre':
//         if (!value) error = 'El nombre es obligatorio.';
//         else if (value.length < 4) error = 'Mínimo 4 caracteres.';
//         break;
//       case 'apellido':
//         if (!value) error = 'El apellido es obligatorio.';
//         else if (value.length < 4) error = 'Mínimo 4 caracteres.';
//         break;
//       case 'email':
//         if (!value) error = 'El correo electrónico es obligatorio.';
//         else if (!value.includes('@')) error = 'El correo electrónico debe contener "@"';
//         break;
//       case 'password':
//         if (!value) error = 'La contraseña es obligatoria.';
//         else if (value.length < 8) error = 'Mínimo 8 caracteres.';
//         break;
//       default:
//         break;
//     }

//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: error
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validar todos los campos al enviar el formulario
//     const newErrors = {
//       nombre: values.nombre ? (values.nombre.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El nombre es obligatorio.',
//       apellido: values.apellido ? (values.apellido.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El apellido es obligatorio.',
//       email: values.email ? (values.email.includes('@') ? '' : 'El correo electrónico debe contener "@"') : 'El correo electrónico es obligatorio.',
//       password: values.password ? (values.password.length >= 8 ? '' : 'Mínimo 8 caracteres.') : 'La contraseña es obligatoria.'
//     };

//     setErrors(newErrors);

//     // Si hay errores, no enviar el formulario
//     if (Object.values(newErrors).some(error => error !== '')) {
//       return;
//     }

//     const notific = values.check ? 'true' : 'false';
    
//     const userReg = {
//       nombre: values.nombre,
//       apellido: values.apellido,
//       email: values.email,
//       password: values.password,
//       notificaciones: notific,
//     };

//     const userRegJson = JSON.stringify(userReg);

//     // Guardar la cadena JSON en localStorage
//     localStorage.setItem('user', userRegJson);
    
//     // Redirigir a la página de inicio de sesión
//     navigate('/signIn');
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.rojo }}>
//             <CiLock />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Crear cuenta
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} sx={{ }}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="nombre"
//                   required
//                   fullWidth
//                   id="nombre"
//                   label="Nombre"
//                   autoFocus
//                   value={values.nombre}
//                   onChange={handleChange}
//                   error={!!errors.nombre}
//                   sx={{mt: 1.5}}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                 />
//                 {errors.nombre && (
//                   <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute'}}>
//                     {errors.nombre}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="apellido"
//                   label="Apellido"
//                   name="apellido"
//                   autoComplete="family-name"
//                   value={values.apellido}
//                   onChange={handleChange}
//                   error={!!errors.apellido}
//                   sx={{mt: 1.5}}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                 />
//                 {errors.apellido && (
//                   <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute' }}>
//                     {errors.apellido}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Dirección de E-mail"
//                   name="email"
//                   autoComplete="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   error={!!errors.email}
//                   sx={{mt: 1.5}}
//                   // InputProps={{
//                   //   sx: component.ingresoInp,
//                   // }}
//                   // InputLabelProps={{
//                   //   sx: component.label,
//                   // }}
//                   InputProps={{
//                     sx: error ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError,
//                   }}
//                   InputLabelProps={{
//                     sx: component.components.MuiTextField.styleOverrides.root,
//                   }}
//                 />
//                 {error && (
//                   <FormHelperText error sx={{ display: 'block', fontSize: '8px' }}>
//                     {helperText}
//                   </FormHelperText>
//                   )}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Contraseña"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={values.password}
//                   onChange={handleChange}
//                   error={!!errors.password}
//                    sx={{mt: 1.5}}
//                   InputProps={{
//                     sx: component.ingresoInp,
//                   }}
//                   InputLabelProps={{
//                     sx: component.label,
//                   }}
//                 />
//                 {errors.password && (
//                   <FormHelperText error sx={{ display: 'block', fontSize: '8px' }}>
//                     {errors.password}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox checked={values.check} onChange={handleChange} name="check" color="primary" />}
//                   label="Deseo recibir información sobre novedades y promociones via e-mail."
//                   sx={{
//                     '& .MuiFormControlLabel-label': {
//                       fontSize: '10px',
//                     },
//                     '& .MuiCheckbox-root': {
//                       '&.Mui-checked': {
//                         color: theme.palette.primary.azul, 
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2, mb: 1.5, backgroundColor: theme.palette.primary.btnReg, '&:hover': {
//                   bgcolor: theme.palette.primary.azul
//                 }
//               }}
//             >
//               Registrarse
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Button
//                   onClick={() => navigate('/signIn')}
//                   sx={{
//                     color: theme.palette.primary.btnReg,
//                     bgcolor: theme.palette.primary.transparent,
//                     textTransform: 'capitalize',
//                     '&:hover': {
//                       color: theme.palette.primary.azul,
//                       fontWeight: '900',
//                       bgcolor: theme.palette.primary.transparent
//                     }
//                   }}
//                 >
//                   Iniciar sesión
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         {/* <Copyright sx={{ mt: 4 }} /> */}
//       </Container>
//     </ThemeProvider>
//   );
// }


import React, { useState } from 'react';
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
import { ComponentCustom } from '../context/ComponentCustom';
import FormHelperText from '@mui/material/FormHelperText';


const defaultTheme = createTheme();

export default function SignUp() {
  const theme = ThemeCustom();
  const component = ComponentCustom();
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {
      nombre: values.nombre ? (values.nombre.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El nombre es obligatorio.',
      apellido: values.apellido ? (values.apellido.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El apellido es obligatorio.',
      email: values.email ? (values.email.includes('@') ? '' : 'El correo electrónico debe contener "@"') : 'El correo electrónico es obligatorio.',
      password: values.password ? (values.password.length >= 8 ? '' : 'Mínimo 8 caracteres.') : 'La contraseña es obligatoria.'
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    const notific = values.check ? 'true' : 'false';
    
    const userReg = {
      nombre: values.nombre,
      apellido: values.apellido,
      email: values.email,
      password: values.password,
      notificaciones: notific,
    };

    const userRegJson = JSON.stringify(userReg);

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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                  value={values.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  sx={{mt: 1.5}}
                  InputProps={{
                    sx: errors.nombre ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError,
                  }}
                  InputLabelProps={{
                    sx: component.components.MuiTextField.styleOverrides.root,
                  }}
                />
                {errors.nombre && (
                  <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute' }}>
                    {errors.nombre}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  value={values.apellido}
                  onChange={handleChange}
                  error={!!errors.apellido}
                  sx={{mt: 1.5}}
                  InputProps={{
                    sx: errors.apellido ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError,
                  }}
                  InputLabelProps={{
                    sx: component.components.MuiTextField.styleOverrides.root,
                  }}
                />
                {errors.apellido && (
                  <FormHelperText error sx={{ display: 'block', fontSize: '8px', position: 'absolute' }}>
                    {errors.apellido}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
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
                  sx={{mt: 1.5}}
                  InputProps={{
                    sx: errors.email ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError,
                  }}
                  InputLabelProps={{
                    sx: component.components.MuiTextField.styleOverrides.root,
                  }}
                />
                {errors.email && (
                  <FormHelperText error sx={{ display: 'block', fontSize: '8px' }}>
                    {errors.email}
                  </FormHelperText>
                )}
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
                  value={values.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  sx={{mt: 1.5}}
                  InputProps={{
                    sx: errors.password ? component.components.MuiTextField.styleOverrides.error : component.components.MuiTextField.styleOverrides.noError,
                  }}
                  InputLabelProps={{
                    sx: component.components.MuiTextField.styleOverrides.root,
                  }}
                />
                {errors.password && (
                  <FormHelperText error sx={{ display: 'block', fontSize: '8px' }}>
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={values.check} onChange={handleChange} name="check" color="primary" />}
                  label="Deseo recibir información sobre novedades y promociones via e-mail."
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2, mb: 1.5, backgroundColor: theme.palette.primary.btnReg, '&:hover': {
                  bgcolor: theme.palette.primary.azul
                }
              }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={() => navigate('/signIn')}
                  sx={{
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
                  Iniciar sesión
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
