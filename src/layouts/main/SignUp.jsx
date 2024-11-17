import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import { ThemeCustom } from "../../context/ThemeCustom";
import { ComponentCustom } from '../../context/ComponentCustom';
import { OrdenShopContext } from '../../context/OrdenShop';
import { CiLock } from "react-icons/ci";

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

  const [showPassword, setShowPassword] = useState(false); 

  // Manejo de cambios en los campos
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, value);
  };

  // Validación de campos
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
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) error = 'El correo electrónico no tiene un formato válido.';
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

  // Manejo de registro de usuario
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
       const newErrors = {
      nombre: values.nombre ? (values.nombre.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El nombre es obligatorio.',
      apellido: values.apellido ? (values.apellido.length >= 4 ? '' : 'Mínimo 4 caracteres.') : 'El apellido es obligatorio.',
      email: values.email ? (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ? '' : 'El correo electrónico no tiene un formato válido.') : 'El correo electrónico es obligatorio.',
      password: values.password ? (values.password.length >= 8 ? '' : 'Mínimo 8 caracteres.') : 'La contraseña es obligatoria.'
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    try {
      // Crear el usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

      const userId = userCredential.user.uid;
      const notific = values.check ? 'true' : 'false';

      // Guardar los datos adicionales en Firestore
      const userReg = {
        userId: userId,
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        notificaciones: notific,
        fechaAlta: new Date().toISOString()
      };

      // Guardar los datos del usuario en Firestore
      await setDoc(doc(db, 'users', userId), userReg);

      navigate('/signIn');
    } catch (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Hubo un problema con el registro. Intenta nuevamente.'
      }));
    }
  };

return (
  <ThemeProvider theme={defaultTheme}>
    <Container>
      <Box
        sx={{
          marginTop: '0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <Avatar sx={{
            m: 1,
            bgcolor: theme.palette.primary.rojo
          }}>
            <CiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmitRegister}
          sx={{
            marginTop: '16px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <Box sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: '3%'
          }}>
            <Box sx={{
              position: 'relative',
              marginBottom: '30px'
            }}>
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
                name="nombre"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                value={values.nombre}
                onChange={handleChange}
                error={!!errors.nombre}
                InputProps={{
                  sx: {
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
                <FormHelperText error
                  sx={{
                    display: 'block',
                    fontSize: { xs: '8px', sm: '9px' },
                    position: 'absolute',
                    fontWeight: 800
                  }}>
                  {errors.nombre}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{
              position: 'relative',
              marginBottom: '30px'
            }}>
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
                <FormHelperText error sx={{
                  display: 'block',
                  fontSize: { xs: '8px', sm: '9px' },
                  position: 'absolute',
                  fontWeight: 800
                }}>
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
              <FormHelperText error
                sx={{
                  display: 'block',
                  fontSize: { xs: '8px', sm: '9px' },
                  position: 'absolute',
                  fontWeight: 800,
                }}>
                {errors.email}
              </FormHelperText>
            )}
          </Box>

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
              InputProps={{
                sx: {
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
              <FormHelperText error
                sx={{ 
                  display: 'block',
                  fontSize: { xs: '8px', sm: '9px' },
                  position: 'absolute',
                  fontWeight: 800,
                  }}>
                {errors.password}
              </FormHelperText>
            )}
          </Box>
          <FormControlLabel
            control={<Checkbox checked={values.check} onChange={handleChange} name="check" color="primary" />}
            label="Deseo recibir información via e-mail."
            sx={{
              marginTop: { xs: '20px', sm: '15px' },
              marginBottom: '20px',
              height: '10px',
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
          variant="contained"
          sx={{
            marginTop: { xs: '6px', sm: '16px' },
            marginBottom: { xs: '24px', sm: '6px' },
            width: '100%',
            maxWidth: '216px',
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
            display: { xs: 'none', sm: 'flex' },
            color: theme.palette.primary.btnReg,
            bgcolor: theme.palette.primary.transparent,
            textTransform: 'capitalize',
            '&:hover': {
              color: theme.palette.primary.azul,
              fontWeight: 900,
              bgcolor: theme.palette.primary.transparent
            }
          }}
        >
          <span style={{
            fontSize: '8px',
            marginRight: '4px'
          }}>¿Tienes cuenta? </span> Inicia sesión
        </Button>
      </Box>
    </Container>
  </ThemeProvider>
);
}
