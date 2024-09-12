
// import { useState, useContext } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// // import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { GoPerson } from "react-icons/go";
// import { ThemeCustom } from "../../context/ThemeCustom";
// import { ComponentCustom } from '../../context/ComponentCustom';
// import { useNavigate } from 'react-router-dom';
// import { OrdenShopContext } from '../../context/OrdenShop';
// import { 
//     // IconButton, InputAdornment, 
//     TextField } from '@mui/material';
// // import { VscEye, VscEyeClosed } from "react-icons/vsc";


// const defaultTheme = createTheme();

// export default function SignIn() {
//     const theme = ThemeCustom();
//     const component = ComponentCustom();
//     const { btnIniciarCompra, setBtnIniciarCompra, isLoggedIn, setIsLoggedIn, setUser, auxAnclaMenuCarr, setAuxAnclaMenuCarr, InicSesion, handleIniciarCompra, anclaMenuCarr, setAnclaMenuCarr } = useContext(OrdenShopContext);
//     const navigate = useNavigate();

//     const [errorMessage, setErrorMessage] = useState('');
//     const [values, setValues] = useState({
//         email: '',
//         password: '',
//         rememberMe: false
//     });
//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     // const handleMouseDownPassword = (event) => {
//     //     event.preventDefault();
//     // };

//     const handleChange = (event) => {
//         const { name, value, type, checked } = event.target;
//         setValues(prevValues => ({
//             ...prevValues,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

  
//     const handleSubmit = (event) => {
//         console.log("HandleSubmit - btnIniciarCompra:", btnIniciarCompra,"***", anclaMenuCarr )
//         if (!isLoggedIn) {
//             console.log("no está logueado, procedo al loguin");
//             event.preventDefault();
//             const { email, password } = values;
    
//             // Obtener datos del localStorage
//             const usersJsonArray = localStorage.getItem('users'); // Modificación aquí: Cambiado de 'user' a 'users'
//             let users = [];
//             if (usersJsonArray) {
//                 try {
//                     users = JSON.parse(usersJsonArray);
//                     if (!Array.isArray(users)) {
//                         // Si los datos no son un array, reinicializar como array vacío
//                         users = [];
//                     }
//                 } catch (error) {
//                     console.error("Error al parsear 'users' del localStorage:", error);
//                     users = [];
//                 }
//             }
    
//             // Verificar si el usuario existe y las credenciales coinciden
//             const user = users.find(user => user.email === email && user.password === password);
//             if (user) {
//                 console.log('Inicio de sesión exitoso');
//                 setIsLoggedIn(true);
    
//                 // Guardar el usuario en 'usuarioActual'
//                 localStorage.setItem('usuarioActual', JSON.stringify(user));
    
//                 // Opcional: También podrías actualizar el estado del usuario
//                 setUser(user); // Asumiendo que 'setUser' espera un objeto de usuario completo
    
//                 navigate('/productos'); // Redirigir al inicio
//                 setErrorMessage('');
//                 console.log("btnIniciarCompra:", btnIniciarCompra)
//                 if (btnIniciarCompra) { 
//                     setAnclaMenuCarr(btnIniciarCompra)
//                 }
                
              
//             } else {
//                 setIsLoggedIn(false);
//                 setErrorMessage('Datos incorrectos');
//             }
//         } else {
//             console.log("está logueado");
//         }
//         console.log("LogIn - auxAnclaMenuCarr:", auxAnclaMenuCarr);
//         if (auxAnclaMenuCarr) {
//             console.log("LogIn - auxAnclaMenuCarr:", auxAnclaMenuCarr);
//         }
//     };
    
//     const handleSignUpRedirect = () => {
//         navigate('/signUp');
//     };
    
    

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 {btnIniciarCompra && (
//                     <Box>
//                         Debe iniciar sesión para proseguir con la compra.
//                     </Box>
//                 )}

//                 <Box
//                     sx={{
//                         marginTop: '8px',
//                         marginBottom: '10px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         position: 'relative',
//                         zIndex: '1',
//                         maxHeight: '90vh',
//                     }}
//                 >
//                     <Box sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         flexDirection: 'column',
//                         width: '100%',
//                         marginBlock: '20px'
//                     }}>
//                         <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.rojo }}>
//                             <GoPerson />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             Iniciar sesión
//                         </Typography>
//                     </Box>
//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
//                         <Box>
//                             <Box sx={{ position: 'relative', mb: 1 }}>
//                                 <span
//                                     style={{
//                                         color: theme.palette.primary.azul,
//                                         fontSize: '10px',
//                                         position: 'absolute',
//                                         top: '-9px',
//                                         left: '10px',
//                                         paddingBottom: '0px',
//                                         paddingRight: '15px',
//                                         paddingLeft: '15px',
//                                         marginTop: '3px',
//                                         marginBottom: '0px',
//                                         zIndex: '3',
//                                         backgroundColor: theme.palette.primary.blanco,
//                                         transition: 'background-color 0.3s'
//                                     }}
//                                 >
//                                     Dirección de E-mail
//                                 </span>
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Dirección de E-mail"
//                                     name="email"
//                                     autoComplete="email"
//                                     autoFocus
//                                     value={values.email}
//                                     onChange={handleChange}
//                                     sx={{ marginBlock: '8px' }}
//                                     InputProps={{
//                                         sx: {
//                                             fontSize: '14px',
//                                             ...component.components.MuiTextField.styleOverrides.noError,
//                                             '& .MuiOutlinedInput-input': {
//                                                 paddingBlock: '8px',
//                                             },
//                                         }
//                                     }}
//                                     InputLabelProps={{
//                                         sx: {
//                                             display: 'none',
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                             <Box sx={{ position: 'relative', }}>
//                                 <span
//                                     style={{
//                                         color: theme.palette.primary.azul,
//                                         fontSize: '10px',
//                                         position: 'absolute',
//                                         top: '-9px',
//                                         left: '10px',
//                                         paddingBottom: '0px',
//                                         paddingRight: '15px',
//                                         paddingLeft: '15px',
//                                         marginTop: '3px',
//                                         marginBottom: '0px',
//                                         zIndex: '3',
//                                         backgroundColor: theme.palette.primary.blanco,
//                                         transition: 'background-color 0.3s'
//                                     }}
//                                 >
//                                     Password
//                                 </span>
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     id="password"
//                                     autoComplete="current-password"
//                                     defaultValue={"12345678"}
//                                     onChange={handleChange}
//                                     sx={{ marginBlock: '8px', paddingInline: '0px' }}
//                                     InputLabelProps={{
//                                         sx: {
//                                             display: 'none', // Oculta la etiqueta
//                                         }
//                                     }}
//                                     InputProps={{
//                                         sx: {
//                                             fontSize: '15px',
//                                             marginInline: '0px',
//                                             paddingInline: '0px',
//                                             ...component.bordeInp,
//                                             ...component.components.MuiTextField.styleOverrides.noError,
//                                             '& .MuiInputBase-input': {
//                                                 paddingLeft: '10px',
//                                             },
//                                             '& .MuiOutlinedInput-input': {
//                                                 paddingBlock: '8px',
//                                                 left: '0px',
//                                             }
//                                         },
//                                     }}
//                                 />
//                             </Box>
//                             <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', my: 0 }}>
//                                 <FormControlLabel
//                                     control={<Checkbox name="rememberMe" checked={values.rememberMe} onChange={handleChange} color="primary" />}
//                                     label="Recordarme"
//                                     sx={{
//                                         padding: '0px',
//                                         marginBlock: '0px',
//                                         height: '36px',
//                                         '& .MuiFormControlLabel-label': {
//                                             fontSize: '10px',
//                                         },
//                                         '& .MuiCheckbox-root': {
//                                             '&.Mui-checked': {
//                                                 color: theme.palette.primary.azul,
//                                             },
//                                         },
//                                     }}
//                                 />
//                                 {/* Espacio para el mensaje de error */}
//                                 {errorMessage && (
//                                     <Box sx={{ width: '100%' }}>
//                                         <Typography color="error" sx={{ ml: 2, fontSize: '12px', fontWeight: 900 }}>
//                                             {errorMessage}
//                                         </Typography>
//                                     </Box>
//                                 )}
//                             </Box>
//                         </Box>
//                         <Button
//                             type="submit"
//                             // fullWidth
//                             variant="contained"
//                             sx={{
//                                 marginTop: '16px', marginBottom: '16px', backgroundColor: theme.palette.primary.btnReg, marginInline:'auto', maxWidth: '216px', '&:hover': {
//                                     bgcolor: theme.palette.primary.azul, 
//                                 }
//                             }}
//                         >
//                             Iniciar sesión
//                         </Button>
//                         <Box sx={{ flexDirection: 'column', marginBottom: '20px' }}>
//                             {/* <Box xs>
//                                 <Button sx={{
//                                     paddingBlock: '0px',
//                                     color: theme.palette.primary.btnReg,
//                                     bgcolor: theme.palette.primary.transparent,
//                                     textTransform: 'capitalize',
//                                     '&:hover': {
//                                         color: theme.palette.primary.azul,
//                                         fontWeight: '700',
//                                         bgcolor: theme.palette.primary.transparent
//                                     }
//                                 }}>
//                                     ¿Olvidaste tu contraseña?
//                                 </Button>
//                             </Box> */}
//                             <Box sx={{ cursor: 'pointer' }}>
//                                 <Button
//                                     onClick={handleSignUpRedirect}
//                                     sx={{
//                                         paddingBlock: '0px',
//                                         color: theme.palette.primary.btnReg,
//                                         bgcolor: theme.palette.primary.transparent,
//                                         textTransform: 'capitalize',
//                                         '&:hover': {
//                                             color: theme.palette.primary.azul,
//                                             fontWeight: '900',
//                                             bgcolor: theme.palette.primary.transparent
//                                         }
//                                     }}
//                                 >
//                                     <span style={{ fontSize: '8px', marginRight: '4px' }}>¿No tienes cuenta? </span> Regístrate
//                                 </Button>
//                             </Box>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// }



import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoPerson } from "react-icons/go";
import { ThemeCustom } from "../../context/ThemeCustom";
import { ComponentCustom } from '../../context/ComponentCustom';
import { useNavigate } from 'react-router-dom';
import { OrdenShopContext } from '../../context/OrdenShop';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { db } from '../../../firebase'; // Importa tu configuración de Firebase
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importa funciones necesarias

const defaultTheme = createTheme();

export default function SignIn() {
    const theme = ThemeCustom();
    const component = ComponentCustom();
    const { btnIniciarCompra, setBtnIniciarCompra, isLoggedIn, setIsLoggedIn, setUser, auxAnclaMenuCarr, setAuxAnclaMenuCarr, InicSesion, handleIniciarCompra, anclaMenuCarr, setAnclaMenuCarr } = useContext(OrdenShopContext);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = values;

        // Verificar en Firestore
        const usersRef = collection(db, 'users');
        const estaRegEmail = query(usersRef, where('email', '==', email), where('password', '==', password));
        const querySnapshot = await getDocs(estaRegEmail);

        if (!querySnapshot.empty) {
            // Usuario encontrado
            const user = querySnapshot.docs[0].data();
            console.log("user", user)
            console.log('Inicio de sesión exitoso');
            setIsLoggedIn(true);

            // Guardar el usuario en 'usuarioActual'
            // localStorage.setItem('usuarioActual', JSON.stringify(user.userId));
            const userLS = { "userId": user.userId }; 
            localStorage.setItem('usuarioActual', JSON.stringify(userLS)); 

            // Opcional: También podrías actualizar el estado del usuario
            // setUser(user); // VEEEEEEEEERRRRRRRRR
            navigate('/productos'); // Redirigir al inicio
            setErrorMessage('');
            console.log("btnIniciarCompra:", btnIniciarCompra);
            if (btnIniciarCompra) { 
                setAnclaMenuCarr(btnIniciarCompra)
            }
        } else {
            setIsLoggedIn(false);
            setErrorMessage('Datos incorrectos');
        }
        console.log("LogIn - auxAnclaMenuCarr:", auxAnclaMenuCarr);
        if (auxAnclaMenuCarr) {
            console.log("LogIn - auxAnclaMenuCarr:", auxAnclaMenuCarr);
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signUp');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {btnIniciarCompra && (
                    <Box>
                        Debe iniciar sesión para proseguir con la compra.
                    </Box>
                )}

                <Box
                    sx={{
                        marginTop: '8px',
                        marginBottom: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: '1',
                        maxHeight: '90vh',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        marginBlock: '20px'
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.rojo }}>
                            <GoPerson />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                        <Box>
                            <Box sx={{ position: 'relative', mb: 1 }}>
                                <span
                                    style={{
                                        color: theme.palette.primary.azul,
                                        fontSize: '10px',
                                        position: 'absolute',
                                        top: '-9px',
                                        left: '10px',
                                        paddingBottom: '0px',
                                        paddingRight: '15px',
                                        paddingLeft: '15px',
                                        marginTop: '3px',
                                        marginBottom: '0px',
                                        zIndex: '3',
                                        backgroundColor: theme.palette.primary.blanco,
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    Dirección de E-mail
                                </span>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Dirección de E-mail"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={values.email}
                                    onChange={handleChange}
                                    sx={{ marginBlock: '8px' }}
                                    InputProps={{
                                        sx: {
                                            fontSize: '14px',
                                            ...component.components.MuiTextField.styleOverrides.noError,
                                            '& .MuiOutlinedInput-input': {
                                                paddingBlock: '8px',
                                            },
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            display: 'none',
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ position: 'relative', }}>
                                <span
                                    style={{
                                        color: theme.palette.primary.azul,
                                        fontSize: '10px',
                                        position: 'absolute',
                                        top: '-9px',
                                        left: '10px',
                                        paddingBottom: '0px',
                                        paddingRight: '15px',
                                        paddingLeft: '15px',
                                        marginTop: '3px',
                                        marginBottom: '0px',
                                        zIndex: '3',
                                        backgroundColor: theme.palette.primary.blanco,
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    Password
                                </span>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    defaultValue={"12345678"}
                                    onChange={handleChange}
                                    sx={{ marginBlock: '8px', paddingInline: '0px' }}
                                    InputLabelProps={{
                                        sx: {
                                            display: 'none', // Oculta la etiqueta
                                        }
                                    }}
                                    InputProps={{
                                        sx: {
                                            fontSize: '15px',
                                            marginInline: '0px',
                                            paddingInline: '0px',
                                            ...component.bordeInp,
                                            ...component.components.MuiTextField.styleOverrides.noError,
                                            '& .MuiInputBase-input': {
                                                paddingLeft: '10px',
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                paddingBlock: '8px',
                                                left: '0px',
                                            }
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', my: 0 }}>
                                <FormControlLabel
                                    control={<Checkbox name="rememberMe" checked={values.rememberMe} onChange={handleChange} color="primary" />}
                                    label="Recordarme"
                                    sx={{
                                        padding: '0px',
                                        marginBlock: '0px',
                                        height: '36px',
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
                                {/* Espacio para el mensaje de error */}
                                {errorMessage && (
                                    <Box sx={{ width: '100%' }}>
                                        <Typography color="error" sx={{ ml: 2, fontSize: '12px', fontWeight: 900 }}>
                                            {errorMessage}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Button
                            type="submit"
                            // fullWidth
                            variant="contained"
                            sx={{
                                marginTop: '16px', marginBottom: '16px', backgroundColor: theme.palette.primary.btnReg, marginInline:'auto', maxWidth: '216px', '&:hover': {
                                    bgcolor: theme.palette.primary.azul, 
                                }
                            }}
                        >
                            Iniciar sesión
                        </Button>
                        <Box sx={{ flexDirection: 'column', marginBottom: '20px' }}>
                            {/* <Box xs>
                                <Button sx={{
                                    paddingBlock: '0px',
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
                            </Box> */}
                            <Box sx={{ cursor: 'pointer' }}>
                                <Button
                                    onClick={handleSignUpRedirect}
                                    sx={{
                                        paddingBlock: '0px',
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
                                    <span style={{ fontSize: '8px', marginRight: '4px' }}>¿No tienes cuenta? </span> Regístrate
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
