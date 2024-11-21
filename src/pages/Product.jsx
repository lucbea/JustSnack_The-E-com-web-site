import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrdenShopContext } from '../context/OrdenShop';
import { Box, IconButton, styled } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';
import { ThemeCustom } from '../context/ThemeCustom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import spinner from "../assets/bx_loader.gif";
import { StyleSpinner } from '../hook/StyleSpinner';

export const Product = () => {
    const theme = ThemeCustom();
    const { id } = useParams();
    const navigate = useNavigate();
    const stSpinner = StyleSpinner({ theme });
    const { setHayItemsCarro, setAgregarCarro, setQuitarCarro, setModifItemCarro, setVaciarCarro, ordenCarro, mostrarProduct, setMostrarProduct, handleIncrement, cantMaxStock , setProductIdVolverLoggedIn, mjeHabilitarCarro, setMjeHabilitarCarro, user, carroLS} = useContext(OrdenShopContext)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('404', JSON.stringify(false));
    }, []);

    const TriangleAvatar = styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'end',
        width: '68px',
        height: '68px',
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: theme.palette.primary.verde,
        color: 'white',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        fontSize: '14px',
        paddingTop: '10px',
        boxShadow: theme.palette.primary.sombraBox,
    }));

    useEffect(() => {
        if (mostrarProduct && mostrarProduct.id === id) {
            setProduct(mostrarProduct);
            setLoading(false);
        } else {
            const fetchProduct = async () => {
                try {
                    const docRef = doc(db, 'product', id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProduct(docSnap.data());
                        setMostrarProduct(docSnap.data());
                    } else {
                        setProduct(null);
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                    setProduct(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [id, mostrarProduct, setMostrarProduct]);

    

    const revisarInicioSesion = (productId) => {
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (isLoggedIn) {
            setMjeHabilitarCarro(false);
        }
        else {
            setMjeHabilitarCarro(true);
            setProductIdVolverLoggedIn(productId);
            navigate("/signIn");
        }
    }
   

const handleAgregarCarro = (product) => {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    revisarInicioSesion(product.id);
    if (isLoggedIn) {
        const agregado = ordenCarro.filter((item) => item.id === product.id);
        if (agregado.length > 0) {
            handleIncrement(product)
        } else {
            if (product.stock > 0) {
                            product.cantidadPedida = 1;
                            product.totalItem = product.precio;
                            setQuitarCarro();
                            setModifItemCarro();
                            setVaciarCarro(false);
                            setHayItemsCarro(true);
                            setAgregarCarro(product);
                        }
        }
    } else {
        setMjeHabilitarCarro(true);
        setProductIdVolverLoggedIn(product.id);
        navigate("/signIn");
    }
}
if (loading) {
    return <Box sx={{ ...stSpinner.boxMesagge }}>Cargando...
        <Box sx={{ ...stSpinner.contentSpinner }}>
            <img src={spinner} alt="Loading spinner"
                style={{ ...stSpinner.imgSpinner }} />
        </Box>
    </Box>;
} else {
    if (!product) {
        return (
            <Box sx={{ minWidth: '249px', marginTop: '180px' }}>
                <h2>Producto no encontrado</h2>
            </Box>
        );
    }
}


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ marginInline: { xs: '0px', sm: '30px' }, padding: { xs: '20px', sm: '30px' }, boxShadow: { sx: 'none', sm: theme.palette.primary.sombra }, position: 'relative', borderRadius: '4px', maxWidth: '1000px' }}>
                {product.descuento > 0 && (
                    <TriangleAvatar>
                        <p style={{
                            paddingInline: '0px',
                            position: 'absolute',
                            top: '-12px',
                            right: '10px',
                        }}>Dto</p>
                        <p style={{
                            paddingInline: '0px',
                            position: 'absolute',
                            top: '4px',
                            right: '10px',
                        }}>{product.descuento}%</p>
                    </TriangleAvatar>
                )}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '40% 60%' },
                    boxSizing: 'border-box',
                    maxWidth: '1050px',
                }}>
                    <Box sx={{
                        height: 'auto',
                        width: 'auto',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        position: 'relative',
                    }}>
                        <img
                            src={product.imagen}
                            alt={product.nombre}
                            style={{
                                height: '70%',
                                maxWidth: '300px',
                                objectFit: 'contain'
                            }}
                        />
                        {(product.stock < 1) ? <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '30px',
                            boxShadow: 'inset 0px 0px 14px 4px grey',
                            backgroundColor: '#ffffffc4',
                            borderRadius: '4px',
                            maxWidth: '200px'
                        }}><p style={{ color: 'black' }}>SIN  STOCK</p></Box> : null}
                    </Box>
                    <Box sx={{ paddingLeft: { xs: '0px', sm: '20px' }, fontSize: { xs: '20px', sm: '30px' } }}>
                        <p style={{
                            marginBottom: '0px', marginTop: '10px', padding: '0px', fontSize: 'inherit', paddingRight: '10px', fontWeight: 900, backgroundColor: theme.palette.primary.doradoClaro, borderRadius: '4px'
                        }}>{product.nombre}</p>
                        <span style={{ fontSize: '20px', marginBottom: '0px', marginTop: '5px', fontSize: '20px', paddingLeft: '5px', fontWeight: 900 }}>x</span>
                        <span style={{ fontSize: '20px', marginBottom: '0px', marginTop: '5px', paddingLeft: '5px', fontWeight: 900 }}>{product.presentacion}</span>
                        <Box sx={{ fontSize: { xs: '10px', sm: '14px' } }}> <p style={{ fontSize: 'inherit', marginTop: '0px', marginBottom: '25px' }}>SKU: {product.id}</p></Box>

                        <Box sx={{ fontSize: { xs: '12px', sm: '15px' } }}>
                            <p style={{ marginBottom: '8px' }}>{product.descripcion}</p>
                        </Box>

                    </Box>

                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: { xs: 'flex', sm: 'flex', md: 'flex' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginInline: '0px',

                        marginBottom: '10px',
                        flexDirection: 'column',
                        fontSize: { xs: '12px', sm: '13px' },
                    }}
                >
                    <p style={{ fontSize: 'inherit', marginBlock: '8px' }}>{product.descripcionLarga}</p>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative', fontSize: { xs: '20px', sm: '28px' }, marginInline: { xs: '10px', sm: '40px' }, marginTop: '20px' }}>
                        <p style={{ fontSize: 'inherit', fontWeight: 700, marginBlock: '8px', paddingLeft: '20px' }}>Precio: ${product.precio}</p>
                        {cantMaxStock &&
                            <Box sx={{ position: 'absolute', top: '45px', right: '15px', color: 'red', height: '30px', fontSize: { xs: '10px', sm: '14px' } }}>
                                <p style={{ color: theme.palette.primary.rojo, fontSize: 'inherit', fontWeight: 900 }}>No hay más productos para la venta</p>
                            </Box>
                        }
                        <IconButton
                            sx={{
                                width: '56px',
                                height: '56px',
                                color: theme.palette.primary.verde,
                                fontSize: { xs: '30px', sm: '40px' },
                                marginInline: { xs: '10px', sm: '40px' },
                                '&:focus': {
                                    outline: '0px solid #00000000'
                                },
                                '&:focus-visible': {
                                    outline: '0px solid #00000000'
                                },
                            }}
                            aria-label="add to favorites"
                            onClick={() => handleAgregarCarro(product)}
                            disabled={product.stock < 1}
                        >
                            <BsCartPlus
                                sx={{
                                    outline: 'none',
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
